import './Card.css'

interface Children{
    children? : React.ReactNode;
}

export default function Card({children} : Children){
    return (
        <>
            <div className='card'>
                <div className='content'>
                    {children}
                </div>
            </div>
        </>
    );
}