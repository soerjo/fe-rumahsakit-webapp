'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Input,
    Typography,
    CardBody,
    Chip,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const TABLE_HEAD = ["Nama Pasien", "Praktek", "Status", "waktu registrasi", "action"];

const formatTanggal = (tanggal: Date | string) => {
    return new Date(tanggal).toDateString() + " | " + new Date(tanggal).toLocaleTimeString()
}

export default function TablePasien({ pasien }: { pasien: any }) {
    const router = useRouter()

    const diagnosaPasien = (pasienid: string) => {
        router.push("/dashboard/dokter/diagnosa/" + pasienid)
    }
    return (
        <div className="w-full p-3">
            <div className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            List Pasien
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Kehadiran pasien hari ini di puskesmas balai bersama.
                        </Typography>
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
                        {pasien.map((perpasien: any, index: number) => {
                            const isLast = index === pasien.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            if (perpasien.diagnosa) return

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                                    {perpasien?.fullname}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {perpasien?.id}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {perpasien?.praktek?.nama_praktek}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {perpasien?.praktek?.dokter?.fullname}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={perpasien?.diagnosa ? "selesai" : "menunggu"}
                                                color={perpasien?.diagnosa ? "blue-gray" : "green"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {formatTanggal(perpasien?.created_at)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Diagnosa Pasien">
                                            <IconButton onClick={() => diagnosaPasien(perpasien.id)} variant="text" color="blue-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
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