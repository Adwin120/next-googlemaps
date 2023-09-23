"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
interface Props {}
const MarkerFormSubmitButton: React.FC<Props> = () => {
    const status = useFormStatus()
    console.log(status);
    return <button>Add</button>;
};

export default MarkerFormSubmitButton;