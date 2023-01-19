//import libraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

//import assets
import { menuIco, infoIco, calendarIco } from '../assets/icons';

//Misc
import { baseURL } from '../helpers/baseURL';
import axios from 'axios';

// create a component
const Home = () => {
    const [NIK, setNIK] = useState('');
    const [namaKaryawan, setNamaKaryawan] = useState('');
    const [namaDepartemen, setDepartemen] = useState('');
    const [namaPT, setPT] = useState('');
    const [lokasiKerja, setLokasiKerja] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('dd/mm/yyyy');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate);

        console.log(fDate + ' (' + ftime + ')');
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const btnClear = () => {
        setNIK('');
        setNamaKaryawan('');
        setDepartemen('');
        setPT('');
        setLokasiKerja("");
        setText('dd/mm/yyyy')
    }

    const btnSubmit = async () => {
        alert("Berhasil Menambah Data")
        try {
            const res = await axios.post(`${baseURL}/pegawai`, {
                nik: NIK,
                nama: namaKaryawan,
                tempat_lahir: tempatLahir,
                tgl_lahir: date.toISOString().substring(0, 10),
                departemen: namaDepartemen,
                pt: namaPT,
                lokasi_kerja: lokasiKerja
            });
            setNIK('');
            setNamaKaryawan('');
            setDepartemen('');
            setPT('');
            setLokasiKerja("");
            setText('dd/mm/yyyy')
            console.log("res", res)
        } catch (error) {
            console.log("error:", error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity>
                    <Image style={styles.header__ico} source={infoIco} />
                </TouchableOpacity>
                <Text style={styles.header__title}>Home</Text>
                <TouchableOpacity>
                    <Image style={styles.header__ico} source={menuIco} />
                </TouchableOpacity>
            </View>

            <View style={styles.form__container}>
                <Text style={styles.form__title}>Input Data Karyawan</Text>

                <Text style={styles.input__title}>NIK</Text>
                <TextInput style={styles.input__text} keyboardType='numeric' placeholder='Input NIK' onChangeText={setNIK} value={NIK} />

                <Text style={styles.input__title}>Nama Karyawan</Text>
                <TextInput style={styles.input__text} placeholder='Input Nama Karyawan' onChangeText={setNamaKaryawan} value={namaKaryawan} />

                <Text style={styles.input__title}>Tempat Lahir</Text>
                <TextInput style={styles.input__text} placeholder='Input Tempat Lahir' onChangeText={setTempatLahir} value={tempatLahir} />

                <Text style={styles.input__title}>Tanggal Lahir</Text>
                <View style={styles.date__container}>
                    <Text style={styles.date__text}>{text}</Text>
                    <TouchableOpacity style={styles.date__btn} onPress={() => showMode('date')}>
                        <Image style={styles.cal__btn} source={calendarIco} />
                    </TouchableOpacity>
                    {/* <Button title='DatePicker' onPress={()=>showMode('date')}/> */}

                    {show && (
                        <DateTimePicker testID='dateTimePicker' value={date} mode={mode} is24Hour={true} display='default' onChange={onChange} />
                    )}
                </View>


                <Text style={styles.input__title}>Departemen</Text>
                <TextInput style={styles.input__text} placeholder='Input Departemen' onChangeText={setDepartemen} value={namaDepartemen} />

                <Text style={styles.input__title}>PT</Text>
                <TextInput style={styles.input__text} placeholder='Input PT' onChangeText={setPT} value={namaPT} />

                <Text style={styles.input__title}>Lokasi Kerja</Text>
                <TextInput style={styles.input__text} placeholder='Input Lokasi Kerja' onChangeText={setLokasiKerja} value={lokasiKerja} />

                <View style={styles.btn__container}>
                    <TouchableOpacity style={styles.btn__submit} onPress={btnSubmit}>
                        <Text style={styles.btn__text}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn__clear} onPress={btnClear}>
                        <Text style={styles.btn__text}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'cyan',
        gap: 123,
        height: 55,
    },

    header__ico: {
        height: 30,
        width: 30,
    },

    header__title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },

    form__title: {
        fontSize: 32,
        fontFamily: 'Karla-Bold',
        color: 'black',
        alignSelf: 'center',
        marginTop: 5,
    },

    form__container: {
        marginHorizontal: 20,
    },

    date__container: {
        flexDirection: 'row',
    },

    date__text: {
        height: 40,
        width: 325,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 50,
        fontSize: 14,
        paddingTop: 10,
    },

    date__btn: {
        // height: 40,
        // width: 40,
        // borderWidth: 2,
        // borderColor: 'gray',
        // borderRadius: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cal__btn: {
        height: 35,
        width: 35,
    },

    input__text: {
        height: 40,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 50,
        fontSize: 14,
    },

    input__title: {
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },

    btn__container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    btn__submit: {
        height: 40,
        width: 120,
        backgroundColor: '#9dff00',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 20,
    },

    btn__clear: {
        height: 40,
        width: 120,
        backgroundColor: '#fc3512',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    btn__text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    }
});

//make this component available to the app
export default Home;
