import React, {useState} from 'react';
import { animated, useSpring, easings } from 'react-spring';
import {Box, Button,Stack} from '@mui/material'
import * as Realm from 'realm-web';

import circle from '../images/spinHHE1.png'
import imageTick1 from '../images/tick1.png'
import imageTick2 from '../images/tick2.png'

var ss = sessionStorage;

const realmapp = new Realm.App({id: "sukien-hhe-hspjw"});
const credentials = Realm.Credentials.anonymous();
// sa NOAgCzfYrPvOnRC9

const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/sukien-hhe-hspjw/endpoint/prize?secret=916h30HifOtOlIei";
// const rules=[
//     [565,605], // Bình nước
//     [610,650], // Balo
//     [790,830], // 2 quyển tập
//     [700,740], // Gấu bông lớn
//     [835,875], // Gấu bông nhỏ
//     [880,920], // Hẹn gặp bạn tại HHE
//     [655,695], // HHE mãi yêu
//     [745,785], // Chúc bạn may mắn
// ]

const rules=[
    [935,985], //Balo1
    [695,745], //balo2
    [815,865], //Gấu bông
    [755,805], //HHE Mãi yêu
    [995,1045], //Chúc bạn may mắn
    [875,925], //Hẹn gặp bạn tại HHE
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Spin(props){
    // const [style , action] = useSpring(() => ({ transform: "rotate(112.5deg)" }));
    const [style , action] = useSpring(() => ({ transform: "rotate(30deg)" }));
    const [runAnimation, setrunAnimation] = useState(false);
    const [isDone, setIsDone] = useState(false);

    function quaySo(){
        setIsDone(true)
        if(!runAnimation && parseInt(ss.getItem("spin")) === 1){
            fetch(url)
            .then(response => response.json()) // parse JSON from request
            .then(resultData => {
                ss.setItem("prize", resultData.number);
                var current = rules[resultData.number];
                // alert(resultData.number, current)
                setrunAnimation(true)
                action.start({transform: `rotate(${getRandomInt(current[1]-current[0])+current[0]+2160}deg)`,config:{duration:10000,easing: easings.easeOutExpo}})
                // action.start({transform: `rotate(${getRandomInt(1045-1045)+1045+2160}deg)`,config:{duration:10000,easing: easings.easeOutExpo}})
                setTimeout(async () => {
                    try {
                        await submit(resultData.number)
                    } catch (err) {
                        console.error("Error submitting:", err);
                    }
                }, 11000);
                setTimeout(notifi,10000);
            })
            ss.setItem("spin", 1);
        }
    }

    async function submit(props){
        const realmUser = await realmapp.logIn(credentials);
        const rs = await realmUser.callFunction('updatePrize', {phoneNumber: ss.phoneNumber}, {$set:{prize: props}});
        sessionStorage.setItem("action", "done "+ rs.id);
    }

    function notifi(){
        var prize = parseInt(sessionStorage.prize);
        var result;
        switch(prize){
            case 0: 
                result = "1 Balo";
                break;
            case 1: 
                result = "1 Balo";
                break;
            case 2: 
                result = "1 Gấu bông";
                break;
            // case 3: 
            //     result = "1 Gấu bông lớn";
            //     break;
            // case 4: 
            //     result = "1 Gấu bông nhỏ";
            //     break;
            default:
                break;
        }
        if(prize < 3){
            document.getElementById("result").innerHTML = `Chúc mừng bạn đã trúng ${result} !`;
        }else{
            document.getElementById("result").innerHTML = "Hẹn gặp bạn tại HHE !";
        }
    }

    return(
    <>
        <Box sx={{minHeight: "100%", mb: "20px"}}>      
            <div style={{marginBottom: "30px"}}>
                <h1 style={{color: "#0098FA", textAlign: "center", fontWeight:"bolder", fontSize:"20px", marginBottom: "10px"}}>CHÀO MỪNG ĐẾN VỚI VÒNG QUAY MAY MẮN</h1>
                <h1 id="result" style={{color: "#0098FA", textAlign: "center", fontWeight:"bolder", fontSize:"15px"}}>BẠN NHẬN ĐƯỢC {ss.getItem("spin")} LƯỢT QUAY <br/>CHÚC BẠN MAY MẮN NHÉ!</h1>
            </div>
            <Stack sx={{transform: "rotate(0.25turn)", position:'relative'}} justifyContent="center" alignItems="center">
                <img alt="" src={imageTick1} style={{position:'absolute',top:0,height:'17%'}} />
                <img alt="" src={imageTick2} style={{position:'absolute',top:0,zIndex:9,height:'18%'}} />
                <animated.img src={circle} style={{
                    ...{
                    ...style,
                    padding:20,
                    height:"250px",
                    }
                }}/>
            </Stack>
            <Box textAlign="center">
                {(isDone)?
                <Button sx={{marginTop: "20px"}} href="https://h.edu.vn/tuyensinh/" variant="contained" color="info">Đi đến trang tuyển sinh</Button>:
                <Button sx={{marginTop: "20px"}} onClick={quaySo} variant="contained" color="info">Quay thưởng</Button>}
            </Box>
        </Box>
    </>
    );
}
export default Spin;