import ExcelJS from "exceljs";
import fileUpload from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import {
  findOrCreateCoupon,
  findOrCreateUserSessionTest,
  generateProblemsArray,
} from "../../utils/problems-distribution";

export default (router, { services, exceptions, getSchema }) => {
  const { ItemsService, UsersService } = services;
  router.use(fileUpload());
  router.post("/", async (req, res) => {
    try {
      // Load schema once
      const { user_id, name, contact, session_id } = req.body;
      const schema = await getSchema();

      // Initialize Directus services with the loaded schema
      const couponService = new ItemsService("coupon", { schema });
      const userSessionTestService = new ItemsService("user_session_test", {
        schema,
      });
      const questionBankService = new ItemsService("questions_bank", {
        schema,
      });
      const distribusiSoalService = new ItemsService("distribusi_soal", {
        schema,
      });
      const usersService = new UsersService({ schema });

      const uniqueId = uuidv4();
      const user_email = `user_${uniqueId}@example.com`;
      const user_password = "CBTATRBPN2024"; // Fixed password

      // Step 1: Create a Directus User
      const directusUser = await usersService.createOne({
        email: user_email,
        password: user_password,
        status: "active",
      });

      const coupon = await findOrCreateCoupon(couponService, {
        code: user_id,
        nama_peserta: name,
        nomor_kontak: contact,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: directusUser,
      });

      const problems = await generateProblemsArray(
        distribusiSoalService,
        questionBankService
      );

      await findOrCreateUserSessionTest(userSessionTestService, {
        session: session_id,
        status: "active",
        user: directusUser,
        problems,
        info_peserta: coupon.id,
      });

      // Send success response if all promises resolve successfully
      res.json({ status: "success", message: "Create user successful" });
    } catch (error) {
      // Catch any errors from Promise.all or other parts of the code
      console.error("Error create users:", error);
      res.status(500).json({
        status: "error",
        message: `Error create users: ${error.message}`,
      });
    }
  });

  router.post("/bulk", async (req, res) => {
    if (!req.files || !req.files.file) {
      return res
        .status(400)
        .json({ status: "error", message: "Excel file is required" });
    }
    let userCount = 0;
    let errors = [];
    const BATCH_SIZE = 20;
    
    const excelFile = req.files.file;
    const workbook = new ExcelJS.Workbook();
    try {
      // Load schema once
      const schema = await getSchema();

      // Initialize Directus services with the loaded schema
      const couponService = new ItemsService("coupon", { schema });
      const userSessionTestService = new ItemsService("user_session_test", {
        schema,
      });
      const questionBankService = new ItemsService("questions_bank", {
        schema,
      });
      const distribusiSoalService = new ItemsService("distribusi_soal", {
        schema,
      });
      const usersService = new UsersService({ schema });

      // Load the uploaded Excel file
      await workbook.xlsx.load(excelFile.data);
      const worksheet = workbook.getWorksheet(1); // Assumes data is on the first sheet

      // Get total number of rows for progress tracking
      const totalRows = worksheet.rowCount - 1; // Subtract 1 for header
      console.log(`Starting to process ${totalRows} users`);

      // Convert rows to array for batch processing
      const rows = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        rows.push({
          code: row.getCell(1).value,
          nama_peserta: row.getCell(2).value,
          nomor_kontak: row.getCell(3).value,
          sesi: row.getCell(4).value,
          rowNumber
        });
      });

      // Process rows in batches
      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, Math.min(i + BATCH_SIZE, rows.length));
        console.log(`\nProcessing batch ${Math.floor(i/BATCH_SIZE) + 1} (rows ${i + 1} to ${i + batch.length})`);
        
        const batchPromises = batch.map(rowData => 
          (async () => {
            try {
              // Generate unique ID, email, and password for the user
              const uniqueId = uuidv4();
              const user_email = `user_${uniqueId}@example.com`;
              const user_password = "CBTATRBPN2024"; // Fixed password

              // Step 1: Create a Directus User
              const directusUser = await usersService.createOne({
                email: user_email,
                password: user_password,
                status: "active",
              });

              // Step 2: Find or Create a Coupon Entry for each user
              const coupon = await findOrCreateCoupon(couponService, {
                code: rowData.code,
                nama_peserta: rowData.nama_peserta,
                nomor_kontak: rowData.nomor_kontak,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: directusUser,
              });

              // Step 3: Generate Problems Array for User Session Test
              const problems = await generateProblemsArray(
                distribusiSoalService,
                questionBankService
              );

              // Step 4: Assign user to session with problems
              await findOrCreateUserSessionTest(userSessionTestService, {
                session: rowData.sesi,
                status: "active",
                user: directusUser,
                problems,
                info_peserta: coupon,
              });

              userCount++;
              console.log(`✅ [${userCount}/${totalRows}] Successfully created user: ${rowData.nama_peserta} (Row ${rowData.rowNumber})`);

            } catch (error) {
              const errorMsg = `❌ Error processing row ${rowData.rowNumber} (${rowData.nama_peserta}): ${error.message}`;
              errors.push(errorMsg);
              console.error(errorMsg);
            }
          })()
        );

        await Promise.all(batchPromises);
        console.log(`Completed batch. Total progress: ${userCount}/${totalRows} users processed`);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Final summary
      console.log("\n=== Import Summary ===");
      console.log(`Total users processed: ${userCount}/${totalRows}`);
      console.log(`Successful imports: ${userCount}`);
      console.log(`Failed imports: ${errors.length}`);
      
      const response = {
        status: "success",
        message: "Bulk import completed",
        total_processed: userCount,
        total_rows: totalRows,
        successful: userCount,
        failed: errors.length
      };

      if (errors.length > 0) {
        response.warnings = `${errors.length} rows failed to process`;
        response.errors = errors;
      }

      // Send success response if all promises resolve successfully
      res.json({ status: "success", message: "Bulk import successful" });

    } catch (error) {
      // Catch any errors from Promise.all or other parts of the code
      console.error("Error uploading users:", error);
      res.status(500).json({
        status: "error",
        message: `Error uploading users: ${error.message}`,
        processed: userCount,
        total_rows: totalRows,
        errors
      });
    }
  });
};
