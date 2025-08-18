import { usePage } from "@inertiajs/react"
import type { SharedData } from '@/types';

// to check Permissions on a react componant

// <div>
//         {can("edit-posts") && (
//           <button>Edit Post</button>
//         )}

//         {canAny(["admin", "moderator"]) && (
//           <button>
//             Admin Actions
//           </button>
//         )}

//         {canAll(["read-users", "write-users"]) && (
//           <button>Manage Users</button>
//         )}
// </div>

export function useCan() {
    const { auth } = usePage<SharedData>().props

    const can = (permission: string): boolean => {
        if (!auth.user || !auth.permissions) {
            return false
        }
        return auth.permissions.includes(permission)
    }

    const canAny = (permissions: string[]): boolean => {
        if (!auth.user || !auth.permissions) {
            return false
        }
        return permissions.some((permission) => auth.permissions.includes(permission))
    }

    const canAll = (permissions: string[]): boolean => {
        if (!auth.user || !auth.permissions) {
            return false
        }
        return permissions.every((permission) => auth.permissions.includes(permission))
    }

    return { can, canAny, canAll }
}
