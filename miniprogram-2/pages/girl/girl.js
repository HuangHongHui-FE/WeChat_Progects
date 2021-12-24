var c4=0,c3=0,c2=0,c1=0,c5 = 0,c6=0,c7=0,c8=0,a1 = 0,a2 = 0,a3 = 0,a4 = 0,a5 = 0,a6 = 0,a7 = 0,a8 = 0,b1 = 0,b2 = 0,b3 = 0,b4 = 0,b5 = 0,b6 = 0,b7 = 0,b8 = 0,bb8 = 0,bb7 =0,d1 = 0,d2 = 0,d3 = 0,d4 = 0,d5 = 0,d6 = 0,d8 = 0,last = 0
Page({
  data :{

  },
  onShareAppMessage: function(){
    return {
      title: "体测成绩计算"
    }
  },
  input1: function(i){
    c1 = i.detail.value
    if(c1>=3400){b1=100} else if(c1>=3350&&c1<3400){b1 = 95} else if(c1>=3300&&c1<3350){b1 = 90}
    else if(c1>=3150&&c1<3350){b1=85} else if(c1>=3000&&c1<3150){b1=80} else if(c1>=2900&&c1<3000){b1=78}
    else if(c1>=2800&&c1<2900){b1=76} else if(c1>=2700&&c1<2800){b1=74} else if(c1>=2600&&c1<2700){b1=72} 
    else if(c1>=2500&&c1<2600){b1=70} else if(c1>=2400&&c1<2500){b1=68} else if(c1>=2300&&c1<=2400){b1=66}
    else if(c1>=2200&&c1<2300){b1=64} else if(c1>=2100&&c1<2200){b1=62} else if(c1>=2000&&c1<2100){b1=60} 
    else if(c1>=1960&&c1<2000){b1=50} else if(c1>=1920&&c1<1960){b1=40} else if(c1>=1880&&c1<1920){b1=30} 
    else if(c1>=1840&&c1<1880){b1=20} else if(c1>=1800&&c1<1840){b1=10} else if(c1<1800){b1=0}
    else{b1=0}
    d1 = parseFloat((b1*0.15).toFixed(1))
    this.setData({
      a1: (b1*0.15).toFixed(1)
    })
  },
  input2: function(i){
    c2 = i.detail.value
    if(c2<=7.5&&c2>0){b2=100} else if(c2>7.5&&c2<=7.6){b2 = 95} else if(c2>7.6&&c2<=7.7){b2 = 90}
    else if(c2>7.7&&c2<8.0){b2=85} else if(c2>8.0&&c2<=8.3){b2=80} else if(c2>8.3&&c2<=8.5){b2=78}
    else if(c2>8.5&&c2<=8.7){b2=76} else if(c2>8.7&&c2<=8.9){b2=74} else if(c2>8.9&&c2<=9.1){b2=72} 
    else if(c2>9.1&&c2<=9.3){b2=70} else if(c2>9.3&&c2<=8.3){b2=68} else if(c2>9.5&&c2<=0.7){b2=66}
    else if(c2>9.7&&c2<=9.9){b2=64} else if(c2>9.9&&c2<=10.1){b2=62} else if(c2>10.1&&c2<=10.3){b2=60} 
    else if(c2>10.3&&c2<=10.5){b2=50} else if(c2>10.5&&c2<=10.7){b2=40} else if(c2>10.7&&c2<=10.9){b2=30} 
    else if(c2>10.9&&c2<=11.1){b2=20} else if(c2>11.1&&c2<=11.3){b2=10} else if(c2>11.3){b2=0}
    else{b2=0}
    d2 = parseFloat((b2*0.2).toFixed(1))
    this.setData({
      a2 : (b2*0.2).toFixed(1)
    })
  },
  input3: function(i){
    c3 = i.detail.value
    if(c3>=25.8){b3=100} else if(c3>=24.0&&c3<25.8){b3 = 95} else if(c3>=22.2&&c3<24.0){b3 = 90}
    else if(c3>=20.6&&c3<22.2){b3=85} else if(c3>=19.0&&c3<20.6){b3=80} else if(c3>=17.7&&c3<19.0){b3=78}
    else if(c3>=16.4&&c3<17.7){b3=76} else if(c3>=15.1&&c3<16.4){b3=74} else if(c3>=13.8&&c3<15.1){b3=72} 
    else if(c3>=12.5&&c3<13.8){b3=70} else if(c3>=11.2&&c3<12.5){b3=68} else if(c3>=9.9&&c3<11.2){b3=66}
    else if(c3>=8.6&&c3<9.9){b3=64} else if(c3>=7.3&&c3<8.6){b3=62} else if(c3>=6.0&&c3<7.3){b3=60} 
    else if(c3>=5.2&&c3<6.0){b3=50} else if(c3>=4.4&&c3<5.2){b3=40} else if(c3>=3.6&&c3<4.4){b3=30} 
    else if(c3>=2.8&&c3<3.6){b3=20} else if(c3>=2.0&&c3<2.8){b3=10} else if(c3<2.0){b3=0}
    else{b3=0}
    d3 = parseFloat((b3*0.1).toFixed(1))
    this.setData({
      a3: (b3*0.1).toFixed(1)
    })
  },
  input4: function(i){
    c4 = i.detail.value
    if(c4>=207){b4=100} else if(c4>=201&&c1<207){b4 = 95} else if(b4>=195&&c4<201){b4 = 90}
    else if(c4>=188&&c4<195){b4=85} else if(c4>=181&&c4<188){b4=80} else if(c4>=178&&c4<181){b4=78}
    else if(c4>=175&&c4<178){b4=76} else if(c4>=172&&c4<175){b4=74} else if(c4>=169&&c4<172){b4=72} 
    else if(c4>=166&&c4<169){b4=70} else if(c4>=163&&c4<166){b4=68} else if(c4>=160&&c4<163){b4=66}
    else if(c4>=157&&c4<160){b4=64} else if(c4>=154&&c4<157){b4=62} else if(c4>=151&&c4<154){b4=60} 
    else if(c4>=146&&c4<151){b4=50} else if(c4>=141&&c4<146){b4=40} else if(c4>=136&&c4<141){b4=30} 
    else if(c4>=131&&c4<136){b4=20} else if(c4>=126&&c1<131){b4=10} else if(c4<126){b4=0}
    else{b4=0}
    d4 = parseFloat((b4*0.1).toFixed(1))
    this.setData({
      a4 : (b4*0.1).toFixed(1)
    })
  },
  input5: function(i){
    c5 = i.detail.value
    if(c5 >= 56){b5 = 100} else if(c5 < 56&&c5 >= 54){b5 = 95} else if(c5 < 54&&c5 >= 52){b5 = 90}
    else if(c5<52&&c5>=49){b5=85} else if(c5<49&&c5>=46){b5=80} else if(c5<46&&c5>=44){b5=78}
    else if(c5<44&&c5>=42){b5=76} else if(c5<42&&c5>=40){b5=74} else if(c5<40&&c5>=38){b5=72} 
    else if(c5<38&&c5>=36){b5=70} else if(c5<36&&c5>=34){b5=68} else if(c5<34&&c5>=32){b5=66}
    else if(c5<32&&c5>=30){b5=64} else if(c5<30&&c5>=28){b5=62} else if(c5<28&&c5>=26){b5=60}
    else if(c5<26&&c5>=24){b5=50} else if(c5<24&&c5>=22){b5=40} else if(c5<22&&c5>=20){b5=30}
    else if(c5<20&&c5>=18){b5=20} else if(c5<18&&c5>=16){b5=10} else if(c5<16&&c5>=0){b5 = 0}
    else{b5=0}
    d5 = parseFloat((b5 * 0.1).toFixed(1))
    this.setData({
      a5 : (b5 * 0.1).toFixed(1)
    })
  },
  input6: function(i){
    c6 = i.detail.value
    if(c6 <= 197){b6 = 100} else if(c6>197&&c6<=202){b6 = 95} else if(c6>202&&c6<=207){b6 = 90}
    else if(c6>207&&c6<=214){b6=85} else if(c6>214&&c6<=222){b6=80} else if(c6>222&&c6<=227){b6=78}
    else if(c6>227&&c6<=232){b6=76} else if(c6>232&&c6<=237){b6=74} else if(c6>237&&c6<=242){b6=72} 
    else if(c6>242&&c6<=247){b6=70} else if(c6>247&&c6<=252){b6=68} else if(c6>252&&c6<=257){b6=66}
    else if(c6>257&&c6<=262){b6=64} else if(c6>262&&c6<=267){b6=62} else if(c6>267&&c6<=272){b6=60} 
    else if(c6>272&&c6<=292){b6=50} else if(c6>292&&c6<=312){b6=40} else if(c6>312&&c6<=332){b6=30} 
    else if(c6>332&&c6<=352){b6=20} else if(c6>352&&c6<=372){b6=10} else if(c6>372){b6=0}
    else{b6=0} 
    d6 = parseFloat((b6 * 0.2).toFixed(1))
    this.setData({
      a6 : (b6 * 0.2).toFixed(1)
    })
  },
  
    input7: function(i){
      bb7 = i.detail.value 
      // bb7 = this.data.cb7
    },
    input8: function(i){
      bb8 = i.detail.value
      // bb8 = this.data.cb8
      b7 = (bb8 / (bb7*bb7)).toFixed(1)
      if(b7>=17.2&&b7<=23.9){b8=100} else if((b7<17.2&&b7>0)||(b7>=24.0&&b7<=27.9&&b7>0)){b8 = 80} else if(b7>=28.0){b8 = 60} else{b8 = 0}
      d8 = parseFloat(b8*0.15)
      this.setData({
        a7 : b7,
        a8 : b8*0.15
      })
    },
    zf:function(i){
      last = d1 + d2 + d3 + d4 + d5 + d6 + d8
      this.setData({
        last : last
      })
    }
})





