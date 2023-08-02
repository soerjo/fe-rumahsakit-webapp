'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Input,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import Link from "next/link";
import { ICreateObat } from "../tambah_obat/formInput";

const TABLE_HEAD = ["Nama Obat", "Merek", "Kandungan", "Harga Jual", "Harga Beli", "Qty", "Satuan"];

export default function TableObat({ pasien }: { pasien: ICreateObat[] }) {
    return (
        <div className="w-full p-3">
            <div className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            List Obat
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Ketersedian Obat di puskesmas balai bersama.
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Link href={"/dashboard/farmasi/tambah_obat"} className="flex items-center gap-3 bg-blue-500 text-white px-3 py-2 rounded-lg">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Obat Baru
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                    </div>
                </div>
            </div>
            <CardBody className="max-h-[520px] w-full overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pasien.map((perpasien, index: number) => {
                            const isLast = index === pasien.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                                    {perpasien?.nama_obat}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {perpasien?.merek_obat}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                                {perpasien?.kandungan_obat}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            Rp {perpasien?.harga_jual_satuan}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            Rp {perpasien?.harga_beli_satuan}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {perpasien?.qty_obat}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {perpasien?.satuan_obat}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </div>
    );
}