import {
    CalendarDaysIcon, ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import {Link} from "react-router-dom";

const navigation = [
    {name: 'Kanban', href: '/canban', icon: ViewColumnsIcon, current: true},
    {name: 'Calendar', href: '/calendar', icon: CalendarDaysIcon, current: false, count: 3,},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Sidebar = () => {
    return (
        <div className="flex min-h-0 flex-1 flex-col bg-indigo-700 h-full">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                    <h3 className="text-white text-2xl flex justify-center w-full">Task</h3>
                </div>
                <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                        >
                            <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true"/>
                            <span className="flex-1">{item.name}</span>
                            {item.count ? (
                                <span
                                    className={classNames(
                                        item.current ? 'bg-indigo-600' : 'bg-indigo-800',
                                        'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                                    )}
                                >
                  {item.count}
                </span>
                            ) : null}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}
