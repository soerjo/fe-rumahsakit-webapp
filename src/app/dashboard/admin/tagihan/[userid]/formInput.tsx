'use client'

import React from 'react'
import { useRouter } from 'next/navigation';

import { SatuanObat } from '@/constant/satuanObat.constant';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react'
import ErrorAlert from './errorAlert';
import { updatePasien } from './updatePasien';

export interface IResep {
    kandungan_obat: string;
    qty_obat: string;
    satuan_obat: SatuanObat;
}
const TABLE_HEAD = ["Nama", "Keterangan", "Qty", "Satuan", "Harga"];

const FormInput = ({ pasien, tagihanObat }: { pasien: any, tagihanObat: any }) => {
    const [diagnosa, setdiagnosa] = React.useState("")
    const [inputerror, setinputerror] = React.useState<string[] | null>(null)

    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await updatePasien({ ...pasien, diagnosa }, pasien.id)
        router.push("/dashboard/admin/tagihan")
    }

    return (
        <div className='w-full'>
            <div className="rounded-none p-3">
                <div className="mb-3 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Tagihan Pasien
                        </Typography>
                    </div>
                </div>
            </div>
            {inputerror && <ErrorAlert error={inputerror} />}
            <form onSubmit={onSubmit} className='flex w-full flex-col items-end gap-6 p-3'>
                <div className='flex flex-row gap-3 w-full'>
                    <Input
                        className='capitalize'
                        readOnly
                        value={pasien.fullname}
                        size={"lg"} label="*Nama Pasien"
                        error={false} />
                    <Input
                        className='capitalize'
                        readOnly
                        value={pasien.praktek.nama_praktek}
                        size={"lg"} label="*Praktek"
                        error={false} />
                </div>
                <div className='flex flex-row w-full gap-6'>
                    <Input
                        value={new Date(pasien.tanggal_lahir).toISOString().substring(0, 10)}
                        readOnly
                        size={"md"}
                        label="*Tanggal Lahir"
                        type='date'
                        error={false} />

                    <Input
                        readOnly
                        size={"md"}
                        label="Tinggi"
                        value={pasien.tinggi}
                        error={false} />

                    <Input
                        readOnly
                        size={"md"}
                        label="Berat Badan"
                        value={pasien.berat_badan}
                        error={false} />
                </div>

                <Textarea
                    readOnly
                    label="Diagnosa"
                    value={pasien.diagnosa} onChange={(e) => setdiagnosa(e.target.value)}
                />

                <div className='w-full flex flex-col p-3 outline outline-1 outline-gray-500 rounded-lg gap-3'>
                    <h3 className=' text-blue-gray-500'>Detail Tagihan</h3>
                    <div className='w-full h-[2px] bg-blue-gray-200 bg-opacity-50'></div>

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
                            <tr>
                                <td className={"p-4 border-b border-blue-gray-50"}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                                {pasien.praktek?.nama_praktek}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {pasien.praktek?.dokter?.fullname}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className={"p-4 border-b border-blue-gray-50"}>
                                    <div className="flex flex-col">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {pasien.praktek?.dokter?.specialist}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {pasien.praktek?.id}
                                        </Typography>
                                    </div>
                                </td>

                                <td className={"p-4 border-b border-blue-gray-50"}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        -
                                    </Typography>
                                </td>
                                <td className={"p-4 border-b border-blue-gray-50"}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        -
                                    </Typography>
                                </td>
                                <td className={"p-4 border-b border-blue-gray-50"}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        Rp {pasien?.praktek?.biaya}
                                    </Typography>
                                </td>

                            </tr>
                            {tagihanObat?.map((obat: any, index: number) => {
                                const isLast = index === pasien.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                // if (obat.diagnosa) return

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                                        {obat?.nama_obat}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {obat?.merek_obat}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {obat?.kandungan_obat}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {obat?.id}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {obat.qty_obat}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {obat.satuan_obat}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                Rp {obat.total_harga}
                                            </Typography>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <Button type='submit' fullWidth size='lg'>Bayar</Button>
            </form>
        </div>
    )
}

export default FormInput