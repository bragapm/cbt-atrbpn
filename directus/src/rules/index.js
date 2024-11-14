import fileUpload from "express-fileupload";

export default (router, { services, exceptions, getSchema }) => {
  const { ItemsService, FilesService } = services;

  // Enable file upload middleware
  router.use(fileUpload());

  // Create a new rule with file upload
  router.post("/", async (req, res, next) => {
    try {
      const { name } = req.body;
      const file = req.files?.file; // Expecting the file to be sent with the key 'file_link'

      if (!file) {
        return res
          .status(400)
          .json({ status: "error", message: "No file uploaded" });
      }

      // Get the current schema
      const schema = await getSchema();

      // Initialize FileService for handling file uploads
      const filesService = new FilesService({
        schema,
        accountability: req.accountability,
      });

      const data = {
        filename_download: `${Date.now()}_${file.name}`,
        type: file.mimetype,
        storage: "s3",
        folder: "22064a39-5b41-4629-9a13-e22a1d64bc10",
      };

      // Upload the file to Directus
      const uploadedFile = await filesService.uploadOne(file.data, data);
      const fileId = uploadedFile;

      // Initialize ItemsService to interact with the rules collection
      const itemsService = new ItemsService("rules", {
        schema,
        accountability: req.accountability,
      });

      // Create a new rule record with the file ID
      const newRule = await itemsService.createOne({
        name,
        file_link: fileId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // Respond with the new rule data, including an accessible file link
      res.json({
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  });

  // Retrieve all rules
  router.get("/", async (req, res, next) => {
    try {
      const schema = await getSchema();
      const itemsService = new ItemsService("rules", {
        schema,
        accountability: null,
      });

      const rules = await itemsService.readByQuery({
        filter: { deleted_at: { _null: true } },
      });

      res.json({ status: "success", data: rules });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  });

  // Retrieve a specific rule by ID
  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const schema = await getSchema();
      const itemsService = new ItemsService("rules", {
        schema,
        accountability: null,
      });

      const rule = await itemsService.readOne(id, {
        filter: { deleted_at: { _null: true } },
      });

      if (!rule) {
        throw new Error("Rule not found");
      }

      res.json({ status: "success", data: rule });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  });

  // Update a rule by ID, including updating the file if provided
  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const file = req.files?.file;

      const schema = await getSchema();
      const itemsService = new ItemsService("rules", {
        schema,
        accountability: req.accountability,
      });
      const filesService = new FilesService({
        schema,
        accountability: req.accountability,
      });

      // Check if the rule exists
      const existingRule = await itemsService.readOne(id);
      if (!existingRule) {
        throw new Error("Rule not found");
      }

      let fileId = existingRule.file_link;
      // If a new file is uploaded, replace the existing file
      if (file) {
        const data = {
          filename_download: `${Date.now()}_${file.name}`,
          type: file.mimetype,
          storage: "s3",
          folder: "22064a39-5b41-4629-9a13-e22a1d64bc10",
        };

        const uploadedFile = await filesService.uploadOne(file.data, data);
        fileId = uploadedFile;
      }

      // Update the rule record
      const updatedRule = await itemsService.updateOne(id, {
        name,
        file_link: fileId,
        updated_at: new Date(),
      });

      // Respond with the updated rule data
      res.json({
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  });

  // Soft delete a rule by ID
  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const schema = await getSchema();
      const itemsService = new ItemsService("rules", {
        schema,
        accountability: req.accountability,
      });

      // Check if the rule exists
      const existingRule = await itemsService.readOne(id);
      if (!existingRule) {
        throw new Error("Rule not found");
      }

      // Soft delete the rule by setting the deleted_at timestamp
      await itemsService.updateOne(id, {
        deleted_at: new Date(),
      });

      res.json({
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  });
};
