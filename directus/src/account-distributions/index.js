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

      // Collect promises for processing each row
      const rowPromises = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row

        // Process each row and push the promise into rowPromises
        rowPromises.push(
          (async () => {
            const code = row.getCell(1).value; // Column 1 for `code`
            const nama_peserta = row.getCell(2).value; // Column 2 for `nama_peserta`
            const nomor_kontak = row.getCell(3).value; // Column 3 for `nomor_kontak`
            const sesi = row.getCell(4).value; // Column 4 for `sesi`

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
                code,
                nama_peserta,
                nomor_kontak,
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
                session: sesi,
                status: "active",
                user: directusUser,
                problems,
                info_peserta: coupon,
              });
              console.log("success");
            } catch (error) {
              // Log the specific row error and rethrow it to catch in Promise.all
              console.error(`Error processing row ${rowNumber}:`, error);
              throw new Error(
                `Error processing row ${rowNumber}: ${error.message}`
              );
            }
          })()
        );
      });

      // Process all row promises
      await Promise.all(rowPromises);

      // Send success response if all promises resolve successfully
      res.json({ status: "success", message: "Bulk import successful" });
    } catch (error) {
      // Catch any errors from Promise.all or other parts of the code
      console.error("Error uploading users:", error);
      res.status(500).json({
        status: "error",
        message: `Error uploading users: ${error.message}`,
      });
    }
  });
};
