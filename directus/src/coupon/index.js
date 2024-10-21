import { v4 as uuidv4 } from "uuid";

export default (router, { services, exceptions, getSchema }) => {
  const { UsersService, ItemsService, AuthenticationService } = services;

  router.post("/register", async (req, res) => {
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

      await couponsService.createOne({
        code: coupon_code,
        user_id: newUser,
        status: "Published",
        created_at: now,
        updated_at: now,
        last_login_at: now,
      });

      const authService = new AuthenticationService({
        accountability: null,
        schema: await getSchema(),
      });

      const authData = await authService.login(undefined, {
        email: user_email,
        password: user_password,
      });

      res.json({
        status: "succes",
        data: {
          email: user_email,
          password: user_password,
          last_login_at: newUser.last_login_at,
          access_token: authData.accessToken,
          refresh_token: authData.refreshToken,
        },
      });
    } catch (error) {
      console.error(error);
      res.json({
        status: "error",
        error: new Error(error).message,
      });
      // next(new Error(`Error creating user or coupon: ${error.message}`));
    }
  });
};
