'use client'

import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SatuanObat, satuanObat } from '@/constant/satuanObat.constant';
import { Button, IconButton, Input, Option, Select, Textarea } from '@material-tailwind/react'
import ErrorAlert from './errorAlert';
import { createResep } from './createResep';

export interface IResep {
    kandungan_obat: string;
    qty_obat: string;
    satuan_obat: SatuanObat;
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

            <IconButton onClick={() => handleDeleteResep(index)} color='red' size="sm" className='w-[100px]'>
                <Image src="/assets/icon/trash.svg" alt='plus' width={60} height={60} />
            </IconButton>

        </div >
    )
}

const FormInput = ({ pasien }: { pasien: any }) => {
    const [resepObat, setResepObat] = React.useState<IResep[]>([] as IResep[])
    const [resep, setResep] = React.useState<IResep>({
        kandungan_obat: '',
        qty_obat: '',
        satuan_obat: "" as SatuanObat
    } as IResep)
    const [inputerror, setinputerror] = React.useState<string[] | null>(null)
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await createResep({
            userid: pasien.id,
            item: resepObat
        })
        if (res?.statusCode === 400) return setinputerror(res?.message)

        router.push("/dashboard")
    }

    const addResep = () => {
        if (resep.kandungan_obat && resep.qty_obat && resep.satuan_obat) {

            setResepObat(value => [...value, resep])
            setResep({
                kandungan_obat: '',
                qty_obat: '',
                satuan_obat: "" as SatuanObat
            } as IResep)
        }
    }

    const handleDeleteResep = (index: number) => {
        const obat = [...resepObat]
        obat.splice(index, 1)
        setResepObat(obat)
    }

    return (
        <div className='w-full'>
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
                <Textarea label="Diagnosa" />

                <div className='w-full flex flex-col p-3 outline outline-1 outline-gray-500 rounded-lg gap-3'>
                    <h3 className=' text-blue-gray-500'>Resep Obat</h3>
                    <div className='flex flex-row w-full gap-3'>
                        <Input
                            value={resep.kandungan_obat}
                            onChange={e => setResep(value => ({ ...value, kandungan_obat: e.target.value }))}
                            size={"md"}
                            label="Kandungan Obat"
                            error={false} />

                        <Input
                            value={resep?.qty_obat}
                            onChange={e => setResep(value => ({ ...value, qty_obat: e.target.value }))}
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
                            <ListResepObat key={index} index={index} resep={resep} handleDeleteResep={handleDeleteResep} />
                        ))}
                    </div>

                </div>

                <Button type='submit' fullWidth size='lg'>Submit</Button>
            </form>
        </div>
    )
}

export default FormInput