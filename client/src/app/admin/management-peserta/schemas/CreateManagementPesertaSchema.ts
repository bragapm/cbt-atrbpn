import { z } from "zod";

export const createManagementPesertaSchema = z.object({
  idPeserta: z.string().nonempty("ID peserta harus diisi"),
  namaPeserta: z.string().nonempty("Nama peserta harus diisi"),
  nomorKontak: z.string().nonempty("Nomor kontak harus diisi"),
  sesiUjian: z.string().nullable(),
});
