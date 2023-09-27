"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
interface Props {}
const MarkerFormSubmitButton: React.FC<Props> = () => {
    const {pending} = useFormStatus()
    return <button disabled={pending}>Add</button>;
};

export default MarkerFormSubmitButton;