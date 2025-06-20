import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='h-[88px] bg-white z-50 w-full flex items-center justify-between px-[32px]'>
      <div>
        {/* <p className='text-[#0E121B] text-lg font-medium'>Jahongir Abduazimov</p> */}
        <p className='text-[#0E121B] text-lg'>BUYUK ZAMON ga xush kelibsiz!</p>
      </div>
      <div className='flex items-center gap-3'>
        <Button className='text-[20px] scale-105' size='large' type='text' icon={<SearchOutlined className='text-[20px] scale-120' />} />
        <Button onClick={() => navigate("/bot-notification")} className='text-[20px] scale-105' size='large' type='text' icon={<BellOutlined className='text-[20px] scale-120' />} />
      </div>
    </div>
  )
}

export default Header