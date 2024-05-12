import React, { useState } from 'react';
import {Box, TextField, Button, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import * as Realm from 'realm-web';

const realmapp = new Realm.App({id: "sukien-hhe-hspjw"});
const credentials = Realm.Credentials.anonymous();

var ss = sessionStorage;

function Form(props){
    const [data, setData] = useState({});
    const [favoriteSchool, setFavoriteSchool] = useState('');
    const [FMList, setFMList] = useState([]);
    const [favoriteMajor, setFavoriteMajor] = useState('');
    const [errorText, setErrorText] = useState("");

    function changeData(e){
        var tag = e.target.id;
        var val = e.target.value;
        setData({...data, [tag]: val});
    }

    function changePhone(e){
        var tag = e.target.id;
        var val = e.target.value;
        setData({...data, [tag]: val});
        // eslint-disable-next-line eqeqeq
        if(val[0] != 0){
            console.log(val[0]);
            setErrorText("Sai định dạng số điện thoại");
        }else{
            setErrorText("");
            if(val.match(/\(?([0-9]{4})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/) && val.length === 10){
                setErrorText("");
            }else{
                if(val.length > 10) setErrorText("Dư só");
                else setErrorText("Thiếu số");
            }
        }
    }

    function invalid(e){
        if(e.target.id === "email")
        e.target.setCustomValidity("Email không đúng định dạng");
        else
        e.target.setCustomValidity("Vui lòng nhập thông tin");
    }

    function input(e){
        e.target.setCustomValidity("");
    }

    async function submit(e){
        e.preventDefault();
        if(errorText !== ""){
            alert("Số điện thoại chưa đúng định dạng");
        }else{
            const realmUser = await realmapp.logIn(credentials);
            const rs = await realmUser.callFunction('getHistory', {phoneNumber: data.phoneNumber});
            if(rs.length === 0){
                const rs1 = await realmUser.callFunction('addHistory', data);
                ss.setItem("ratingAction", "done "+ rs1.id);
                ss.setItem("phoneNumber", data.phoneNumber);
                ss.setItem("submited", "true");
                ss.setItem("spin", 1);
                window.location.href = "/";
            }else{
                alert("Số điện thoại đã đăng ký");
            }
        }
    }

    return(
    <>
    <Box sx={{minHeight: "100%", padding: 2}}>
        <h1 style={{color: "#0098FA", textAlign: "center", fontWeight:"bolder", fontSize:"20px"}}>
            Bạn hãy nhập thông tin để đến với vòng quay may mắn nhé!
        </h1>
        <form onSubmit={submit} style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', display: 'flex'}}>
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="fullName" 
                label="Họ và tên"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changePhone} 
                helperText={errorText}
                error={(errorText.length === 0) ? false : true }
                onInvalid={invalid} 
                onInput={input} 
                id="phoneNumber" 
                label="Số điện thoại"
                type="number"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="email" 
                label="Email"
                type="email"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="diaChi" 
                label="Địa chỉ nhà của bạn"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="currentSchool" 
                label="Trường bạn đang theo học"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="currentClass" 
                label="Lớp bạn đang theo học"
                size="small"
            />
            <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="favoriteSchool-label">
                    Trường học bạn muốn đăng ký *
                </InputLabel>
                <Select
                    labelId="favoriteSchool-label"
                    id="favoriteSchool"
                    label="Trường học bạn muốn đăng ký *"
                    onChange={(e) => {
                        var tag = "favoriteSchool"
                        var val = e.target.value;
                        setData({...data, [tag]: val});
                        setFavoriteSchool(val);
                        switch(val){
                            case "Trường Cao đẳng Bình Minh Sài Gòn":
                                setFMList([
                                    "Công nghệ điện ảnh – truyền hình",
                                    "Công nghệ kỹ thuật điện – điện tử",
                                    "Công nghệ thông tin",
                                    "Công nghệ truyền thông",
                                    "Kế toán",
                                    "Nuôi trồng thủy sản",
                                    "Quản trị kinh doanh",
                                    "Thiết kế đồ họa",
                                    "Tiếng Nhật"
                                ]);
                                sessionStorage.setItem("isHEA", null);
                                break;
                            case "Trường Trung cấp Y Dược Vạn Hạnh":
                                setFMList([
                                    "Công nghệ kỹ thuật chế biến và bảo quản thực phẩm",
                                    "Dược",
                                    "Điều dưỡng",
                                    "Hướng dẫn du lịch",
                                    "Kế toán doanh nghiệp",
                                    "Kỹ thuật xét nghiệm y học",
                                    "Tin học ứng dụng",
                                    "Y sỹ",
                                    "Y sỹ y học cổ truyền"
                                ]);
                                sessionStorage.setItem("isHEA", null);
                                break;
                            case "Trường Trung cấp Vạn Tường":
                                setFMList([
                                    "Công nghệ kỹ thuật chế biến và bảo quản thực phẩm",
                                    "Du lịch lữ hành",
                                    "Dược",
                                    "Điều dưỡng",
                                    "Hướng dẫn du lịch",
                                    "Kế toán doanh nghiệp",
                                    "Kinh doanh xuất nhập khẩu",
                                    "Lập trình máy tính",
                                    "Quản trị mạng máy tính",
                                    "Tài chính – Ngân hàng",
                                    "Thiết kế đồ họa",
                                    "Thiết kế và quản lý website",
                                    "Thư ký văn phòng",
                                    "Tin học ứng dụng"
                                ]);
                                sessionStorage.setItem("isHEA", null);
                                break;
                            case "Trường Cao đẳng Âu Lạc - Huế":
                                setFMList([
                                    "Dịch vụ chăm sóc gia đình",
                                    "Dược",
                                    "Dược (Hệ cao đẳng)",
                                    "Điện dân dụng",
                                    "Điều dưỡng",
                                    "Điều dưỡng (Hệ cao đẳng)",
                                    "Hướng dẫn du lịch",
                                    "Kế toán doanh nghiệp",
                                    "Kinh doanh thương mại và dịch vụ",
                                    "Kỹ thuật chế biến món ăn",
                                    "Kỹ thuật chế biến món ăn (Hệ cao đẳng)",
                                    "Kỹ thuật pha chế đồ uống",
                                    "Kỹ thuật sửa chữa, lắp ráp máy tính",
                                    "Nghiệp vụ lễ tân",
                                    "Quản trị mạng máy tính",
                                    "Thú Y",
                                    "Thú y (Hệ cao đẳng)",
                                    "Tiếng Anh lễ tân nhà hàng - khách sạn",
                                    "Tiếng Hàn Quốc",
                                    "Tiếng Nhật",
                                    "Tin học ứng dụng",
                                    "Vận hành, sửa chữa thiết bị lạnh",
                                    "Văn thư hành chính",
                                    "Vẽ thiết kế mỹ thuật có sự trợ giúp bằng máy tính",
                                    "Y sỹ đa khoa"
                                ]);
                                sessionStorage.setItem("isHEA", true);
                                break;
                            default: break;
                        }
                    }}
                    value={favoriteSchool}
                >
                    <MenuItem value={"Trường Cao đẳng Âu Lạc - Huế"}>
                        Trường Cao đẳng Âu Lạc - Huế
                    </MenuItem>
                    <MenuItem value={"Trường Cao đẳng Bình Minh Sài Gòn"}>
                        Trường Cao đẳng Bình Minh Sài Gòn
                    </MenuItem>
                    <MenuItem value={"Trường Trung cấp Vạn Tường"}>
                        Trường Trung cấp Vạn Tường
                    </MenuItem>
                    <MenuItem value={"Trường Trung cấp Y Dược Vạn Hạnh"}>
                        Trường Trung cấp Y Dược Vạn Hạnh
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="favoriteMajor-label">
                    Ngành học bạn yêu thích *
                </InputLabel>
                <Select
                    labelId="favoriteMajor-label"
                    id="favoriteMajor"
                    label="Ngành học bạn yêu thích *"
                    onChange={(e) => {
                        var tag = "favoriteMajor"
                        var val = e.target.value;
                        setData({...data, [tag]: val});
                        setFavoriteMajor(val)
                    }}
                    value={favoriteMajor}
                >
                    {FMList.length === 0 ? null : FMList?.map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" sx={{marginTop: "20px"}} variant="contained" color="info">Xác Nhận</Button>
        </form>
    </Box>
    </>
    );
}
export default Form;