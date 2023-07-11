import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'
import axios from "axios"

const ThemMauSac = ()=>{

    let navigate = useNavigate();

    const[mauSac,setMauSac] = useState({
        ma :"",
        tenDongSanPham:""
    })

    const {ma,tenDongSanPham} = mauSac // tạo contructor

    const onInputChange = (e) => {
        setMauSac({...mauSac,[e.target.name]:e.target.value})
    }
    
    const onSubmit =async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8080/ten-dong-san-pham/save",mauSac)
        navigate("/mau-sac")
    }

   return(
    <div className='container' style={{width:600}}>
       <h2 className='text-center'>Thêm dòng sản phẩm</h2>
                                <Form onSubmit={(e)=>onSubmit(e)}>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="email">Mã</Form.Label>
                                        <Form.Control type="text" 
                                         placeholder='Enter code'
                                         name='ma'
                                         value={ma}
                                         onChange={(e) => onInputChange(e)}
                                         id="ma"/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="pwd">Tên dòng sản phẩm</Form.Label>
                                        <Form.Control type="text" 
                                          placeholder='Enter color'
                                          name='tenMauSac'
                                          value={tenDongSanPham}
                                          onChange={(e) => onInputChange(e)}
                                        id="ten`"/>
                                    </Form.Group>
                                    
                                    <Button type="submit" onc variant="btn btn-primary">Thêm mới</Button>{' '}
                                </Form>
    
    
    </div>
   )
}

export default ThemMauSac