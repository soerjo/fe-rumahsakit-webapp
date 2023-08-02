'use client'

import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SatuanObat, satuanObat } from '@/constant/satuanObat.constant';
import { Button, IconButton, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import ErrorAlert from './errorAlert';
import { createObatKeluar } from './createObatKeluar';
import { updatePasien } from './updatePasien';

export interface IResep {
    harga_beli_satuan: number,
    harga_jual_satuan: number,
    id: string,
    kandungan_obat: string,
    keterangan: string,
    merek_obat: string,
    nama_obat: string,
    qty_obat: number,
    satuan_obat: string,
}


const ListObatKeluar = ({ resep, index, handleDeleteResep }: { index: number, resep: IResep, handleDeleteResep: (index: number) => void }) => {
    return (
        <div className='flex flex-row justify-center items-center w-full gap-3 px-2'>
            <Input
                value={resep.kandungan_obat}
                readOnly
                size={"md"}
                label="Nama Obat"
                error={false} />

            <Input
                value={resep.kandungan_obat}
                readOnly
                size={"md"}
                label="Merek Obat"
                error={false} />

            <Input
                value={resep.qty_obat}
                readOnly
                size={"md"}
                label="Qty Obat"
                type='number'
                error={false} />

            <Input
                value={resep.satuan_obat}
                readOnly
                size={"md"}
                label="Satuan Obat"
                type='text'
                error={false} />

            <IconButton onClick={() => handleDeleteResep(index)} color='red' size="sm" className='w-[100px]'>
                <Image src="/assets/icon/trash.svg" alt='plus' width={60} height={60} />
            </IconButton>

        </div >
    )
}

const ListResepObat = ({ resep, index, handleDeleteResep }: { index: number, resep: IResep, handleDeleteResep: (index: number) => void }) => {
    return (
        <div className='flex flex-row justify-center items-center w-full gap-3 px-2'>
            <Input
                value={resep.kandungan_obat}
                readOnly
                size={"md"}
                label="Kandungan Obat"
                error={false} />

            <Input
                value={resep.qty_obat}
                readOnly
                size={"md"}
                label="Qty Obat"
                type='number'
                error={false} />

            <Input
                value={resep.satuan_obat}
                readOnly
                size={"md"}
                label="Satuan Obat"
                type='text'
                error={false} />

            {/* <IconButton onClick={() => handleDeleteResep(index)} color='red' size="sm" className='w-[100px]'>
                <Image src="/assets/icon/trash.svg" alt='plus' width={60} height={60} />
            </IconButton> */}

        </div >
    )
}

const FormInput = ({ pasien, resep: resepObatbaru, listObat }: { pasien: any, resep: any, listObat: any }) => {
    const [inputerror, setinputerror] = React.useState<string[] | null>(null)
    const [resepObat, setResepObat] = React.useState<IResep[]>([])
    const [resep, setResep] = React.useState<IResep>({} as IResep)

    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // console.log({ resepObat })
        const resCreateResep = await createObatKeluar({ userid: pasien.id, item: resepObat })
        if (resCreateResep?.statusCode === 400) return setinputerror(resCreateResep?.message)

        router.push("/dashboard")
    }

    const addResep = () => {
        console.log({ resep })
        if (resep.nama_obat && resep.qty_obat && resep.satuan_obat) {


            setResepObat(value => [...value, resep])
            setResep({} as IResep)
        }
    }

    const handleDeleteResep = (index: number) => {
        const obat = [...resepObat]
        obat.splice(index, 1)
        setResepObat(obat)
    }

    return (
        <div className='w-full'>
            <div className="rounded-none p-3">
                <div className="mb-3 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Obat Keluar
                        </Typography>
                    </div>
                </div>
            </div>


            {inputerror && <ErrorAlert error={inputerror} />}
            <form onSubmit={onSubmit} className='flex w-full flex-col items-end gap-6 p-3'>
                <Input
                    className='capitalize'
                    readOnly
                    value={pasien.fullname}
                    size={"lg"} label="*Nama Pasien"
                    error={false} />
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
                        label="*Tinggi"
                        value={pasien.tinggi}
                        error={false} />

                    <Input
                        readOnly
                        size={"md"}
                        label="Berat Badan"
                        value={pasien.berat_badan}
                        error={false} />

                </div>
                <Textarea label="*Diagnosa" value={pasien.diagnosa} readOnly />

                <div className='w-full flex flex-col p-3 outline outline-1 outline-gray-500 rounded-lg gap-3'>
                    <h3 className=' text-blue-gray-500'>Resep Obat</h3>
                    <div className='w-full h-[2px] bg-blue-gray-200 bg-opacity-50'></div>
                    <div className='max-h-[200px] overflow-hidden overflow-y-scroll flex flex-col gap-3 py-2'>
                        {resepObatbaru.map((resep: any, index: number) => (
                            <ListResepObat key={index} index={index} resep={resep} handleDeleteResep={handleDeleteResep} />
                        ))}
                    </div>

                </div>

                <div className='w-full flex flex-col p-3 outline outline-1 outline-gray-500 rounded-lg gap-3'>
                    <h3 className=' text-blue-gray-500'>Obat Keluar</h3>
                    <div className='flex flex-row w-full gap-3'>
                        <Select
                            label="Nama Obat"
                            size={"md"}
                            value={resep.nama_obat}
                            onChange={e => {
                                setResep(value => ({ ...value, ...listObat.find((el: any) => el.nama_obat === e) }))
                            }}
                        >
                            {listObat.map((obat: { id: string, nama_obat: string, merek_obat: string }, index: number) => (
                                <Option value={obat.nama_obat} key={index} className='capitalize'>{`${obat.nama_obat} | ${obat.merek_obat}`}</Option>
                            ))}
                        </Select>

                        <Input
                            value={resep?.qty_obat || ""}
                            onChange={e => setResep(value => ({ ...value, qty_obat: parseInt(e.target.value) }))}
                            size={"md"}
                            label="Qty Obat"
                            type='number'
                            error={false} />

                        <Select
                            label="Satuan Obat"
                            size={"md"}
                            value={resep.satuan_obat}
                            onChange={e => setResep(value => ({ ...value, satuan_obat: e as SatuanObat || SatuanObat.BOTOL }))}
                        >
                            {satuanObat.map((satuan, index) => (
                                <Option value={`${satuan}`} key={index}>{satuan}</Option>
                            ))}
                        </Select>

                        <Button onClick={addResep}><Image src="/assets/icon/plus.svg" alt='plus' width={60} height={60} /></Button>

                    </div>
                    <div className='w-full h-[2px] bg-blue-gray-200 bg-opacity-50'></div>
                    <div className='max-h-[200px] overflow-hidden overflow-y-scroll flex flex-col gap-3 py-2'>
                        {resepObat.map((resep, index) => (
                            <ListObatKeluar key={index} index={index} resep={resep} handleDeleteResep={handleDeleteResep} />
                        ))}
                    </div>

                </div>


                <Button type='submit' fullWidth size='lg'>Submit</Button>
            </form >
        </div >
    )
}

export default FormInput