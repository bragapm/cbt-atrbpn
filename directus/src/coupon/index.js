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
      res.status(500).json({
        status: "error",
        error: new Error(error).message,
      });
      // next(new Error(`Error creating user or coupon: ${error.message}`));
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { coupon_code } = req.body;

      // Service untuk kupon
      const couponsService = new ItemsService("coupon", {
        schema: await getSchema(),
      });

      // Cari kupon berdasarkan kode
      const coupon = await couponsService.readByQuery({
        filter: { code: coupon_code },
        limit: 1,
      });

      if (coupon.length === 0) {
        // Jika kupon tidak ditemukan, kembalikan error
        return res.status(404).json({
          status: "error",
          message: "Coupon code not found.",
        });
      }

      const couponData = coupon[0];

      // Dapatkan user_id dari kupon yang ditemukan
      const usersService = new UsersService({ schema: await getSchema() });

      const user = await usersService.readOne(couponData.user_id);

      if (!user || user.status !== "active") {
        return res.status(403).json({
          status: "error",
          message: "User is not authorized or inactive.",
        });
      }

      // Login user menggunakan email dan password
      const authService = new AuthenticationService({
        accountability: null,
        schema: await getSchema(),
      });

      const authData = await authService.login(undefined, {
        email: user.email,
        password: "CBTATRBPN2024", // Sesuaikan dengan password yang dihasilkan saat register
      });

      const now = new Date();

      // Update last_login_at dan updated_at untuk kupon
      await couponsService.updateOne(couponData.id, {
        last_login_at: now,
        updated_at: now,
      });

      res.json({
        status: "success",
        data: {
          email: user.email,
          last_login_at: now,
          access_token: authData.accessToken,
          refresh_token: authData.refreshToken,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: new Error(error).message,
      });
    }
  });

  router.post("/logout", async (req, res) => {
    try {
      const { coupon_code, refresh_token } = req.body;

      // Service untuk kupon
      const couponsService = new ItemsService("coupon", {
        schema: await getSchema(),
      });

      // Cari kupon berdasarkan kode
      const coupon = await couponsService.readByQuery({
        filter: { code: coupon_code },
        limit: 1,
      });

      if (coupon.length === 0) {
        // Jika kupon tidak ditemukan, kembalikan error
        return res.status(404).json({
          status: "error",
          message: "Coupon code not found.",
        });
      }

      const couponData = coupon[0];

      // Service untuk Authentication
      const authService = new AuthenticationService({
        accountability: null,
        schema: await getSchema(),
      });

      try {
        // Proses logout dengan token
        await authService.logout(refresh_token);
      } catch (logoutError) {
        return res.status(401).json({
          status: "error",
          message: "Invalid token or logout failed.",
        });
      }

      const now = new Date();

      // Update last_logout_at dan updated_at untuk kupon
      await couponsService.updateOne(couponData.id, {
        last_logout_at: now,
        updated_at: now,
      });

      res.json({
        status: "success",
        data: {
          coupon_code: coupon_code,
          last_logout_at: now,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: new Error(error).message,
      });
    }
  });
};
