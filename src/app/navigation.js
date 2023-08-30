import Link from "next/link"


export function NavBar({children}){
    return (
        <div className="h-full w-full bg-neutral-800 flex border-t-neutral-600 border-t-2">
            <ul className="w-full divide-y divide-neutral-600">
                {
                    Array.isArray(children) ? 
                        children.map((child,i)=>{
                            return <li className="" key={i}>{child}</li>
                        }) 
                        : <li>{children}</li>
                }
            </ul>
        </div>
    )
}

export function NavBarHeader({children}){
    return (
        <div className="h-full min-w-fit max-w-32
         rounded bg-neutral-800 flex">
            {children}
        </div>
    )
}

export function NavItem({children, link}){
    return (
        <div className="text-sm align-middle w-full py-2 px-4 hover:bg-neutral-900">
            <Link href={link.toString()}>
                {children}
            </Link>
        </div>
    )
}