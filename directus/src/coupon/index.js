import { v4 as uuidv4 } from "uuid";

export default (router, { services, exceptions, getSchema }) => {
  const { UsersService, ItemsService, AuthenticationService } = services;

  router.post("/register", async (req, res, next) => {
    try {
      const { coupon_code } = req.body;

      // Generate email dan password secara otomatis
      const uniqueId = uuidv4();
      const user_email = `user_${uniqueId}@example.com`;
      const user_password = "CBTATRBPN2024"; // Generate password acak

      // Buat akun baru untuk pengguna
      const usersService = new UsersService({ schema: await getSchema() });

      const newUser = await usersService.createOne({
        email: user_email,
        password: user_password,
        status: "active",
      });

      // Buat item kupon baru
      const couponsService = new ItemsService("coupon", {
        schema: await getSchema(),
      });

      const now = new Date();

      const a = await couponsService.createOne({
        code: coupon_code,
        user_id: newUser, // Menggunakan newUser.id
        status: "Published",
        created_at: now,
        updated_at: now,
        last_login_at: now,
      });
      
      // Autentikasi untuk mendapatkan access_token dan refresh_token
      const authService = new AuthenticationService({
        accountability: null,
        schema: await getSchema(),
      });

      console.log({ authService });
      console.log('Attempting login with:', { email: user_email, password: user_password });
      const authData = await authService.login(undefined,{
        email: user_email,
        password: user_password,
      });

      console.log("authdata",authData);

      // Kembalikan informasi yang dibutuhkan
      res.json({
        email: user_email,
        password: user_password,
        last_login_at: newUser.last_login_at,
        access_token: authData.accessToken,
        refresh_token: authData.refreshToken,
      });

    } catch (error) {
      // Gunakan generic error handler jika ServiceUnavailableException tidak tersedia
      console.error("Error creating user or coupon:", error);
      next(new Error(`Error creating user or coupon: ${error.message}`));
    }
  });

  router.get("/", async (req, res) =>
    res.json({ status: "success", data: "Hello" })
  );
};
