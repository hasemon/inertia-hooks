import { useState, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
export const useSearchQuery = (paramName = "search", debounce = 500) => {
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const initialValue = urlParams.get(paramName) || ""
        setSearchValue(initialValue)
    }, [paramName])

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const url = new URL(window.location.href)

        if (value.trim()) {
            url.searchParams.set(paramName, value.trim())
        } else {
            url.searchParams.delete(paramName)
        }

        url.searchParams.set("page", "1")

        router.get(url.toString(), {}, {
            preserveState: true,
            preserveScroll: true,
            onError: () => {
                toast.error("Failed to search. Please try again.")
            },
        })
    }, debounce)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchValue(value)
        debouncedSearch(value)
    }

    return {
        searchValue,
        handleChange,
    }
}
