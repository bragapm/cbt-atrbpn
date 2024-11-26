import { v4 as uuidv4 } from "uuid";
import { formatInTimeZone } from "date-fns-tz";

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
        status: "Published",
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
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
      // next(new Error(`Error creating user or coupon: ${error.message}`));
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { coupon_code, device } = req.body;

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
          message: "ID tidak ditemukan",
        });
      }

      const couponData = coupon[0];

      const userSessionService = new ItemsService("user_session_test", {
        schema: await getSchema(),
      });

      // Cari sesi ujian yang relevan berdasarkan user_id
      const userSession = await userSessionService.readByQuery({
        filter: { user: couponData.user_id },
        limit: 1,
        fields: [
          "session.id",
          "session.start_time",
          "session.end_time",
          "session.login_start",
        ],
      });

      if (userSession.length === 0) {
        return res.status(403).json({
          status: "error",
          message: "Sesi ujian tidak ditemukan",
        });
      }

      const sessionData = userSession[0].session;

      // Validasi apakah waktu sekarang berada dalam rentang sesi ujian
      const now = new Date();
      const timezone = "Asia/Jakarta";
      const startTime = new Date(
        new Date(sessionData.login_start).getTime() - 7 * 60 * 60 * 1000
      );
      const endTime = new Date(
        new Date(sessionData.end_time).getTime() - 7 * 60 * 60 * 1000
      );

      const nowFormatted = formatInTimeZone(
        now,
        timezone,
        "yyyy-MM-dd HH:mm:ssXXX"
      );
      const sessionStartTimeFormatted = formatInTimeZone(
        startTime,
        timezone,
        "yyyy-MM-dd HH:mm:ssXXX"
      );
      const sessionEndTimeFormatted = formatInTimeZone(
        endTime,
        timezone,
        "yyyy-MM-dd HH:mm:ssXXX"
      );

      if (
        nowFormatted < sessionStartTimeFormatted ||
        nowFormatted > sessionEndTimeFormatted
      ) {
        return res.status(403).json({
          status: "error",
          message: "Sesi ujian belum dimulai, silahkan coba saat sesi dimulai",
        });
      }

      // Dapatkan user dari kupon
      const usersService = new UsersService({ schema: await getSchema() });

      const user = await usersService.readOne(couponData.user_id);

      if (!user) {
        return res.status(403).json({
          status: "error",
          message: "User Tidak ditemukan",
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

      // Update last_login_at dan device untuk kupon
      await couponsService.updateOne(couponData.id, {
        last_login_at: now,
        updated_at: now,
        device: device,
      });

      res.json({
        status: "success",
        data: {
          email: user.email,
          full_name: couponData.nama_peserta,
          phone_number: couponData.nomor_kontak,
          last_login_at: now,
          access_token: authData.accessToken,
          refresh_token: authData.refreshToken,
          device: device,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Terjadi Kesalahan, silahkan coba lagi",
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
          message: "ID tidak ditemukan",
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
          message: "Terjadi Kesalahan, silahkan coba lagi",
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
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
    }
  });
};
