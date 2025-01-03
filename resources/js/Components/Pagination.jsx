import { Link } from '@inertiajs/react';

export default function Pagination({ Links }) {
    return (
        <nav aria-label="Page navigation" className='mt-4 text-center'>
            <ul className="inline-flex h-10 -space-x-px text-base">
                {Links.map((link, index) => (
                    <li key={index}>
                        <Link
                            preserveScroll
                            href={link.url || "#"}
                            key={index}
                            className={`inline-block py-2 px-3 rounded-lg text-xs
                            ${link.active ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}
                            ${!link.url ? "cursor-not-allowed text-gray-400 dark:text-gray-600" : "hover:bg-gray-300 dark:hover:bg-gray-800"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={(e) => {
                                if (!link.url) e.preventDefault(); // Prevent navigation for disabled links
                            }}
                        ></Link>


                    </li>
                ))}
            </ul>
        </nav>
    );
}

