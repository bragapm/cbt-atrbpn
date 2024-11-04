import { z } from "zod";

export const updateManagementPesertaSchema = z.object({
  code: z.string().nonempty("ID peserta harus diisi"),
  nama_peserta: z.string().nonempty("Nama peserta harus diisi"),
  nomor_kontak: z.string().nonempty("Nomor kontak harus diisi"),
  sesi_ujian: z.string().nullable(),
});
