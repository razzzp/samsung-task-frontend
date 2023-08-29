import Link from "next/link"


export function NavBar({children}){
    return (
        <div>
            <ul>
                {
                    Array.isArray(children) ? 
                        children.map((child,i)=>{
                            return <li key={i}>{child}</li>
                        }) 
                        : <li>{children}</li>
                }
            </ul>
        </div>
    )
}

export function NavItem({children, link}){
    return (
        <div>
            <Link href={link.toString()}>
                {children}
            </Link>
        </div>
    )
}