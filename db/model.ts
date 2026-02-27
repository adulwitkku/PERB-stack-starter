import * as schema from "./schema"
import { spreads } from "./utils"

export const db = {
    insert: spreads(
        {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
        "insert",
    ),
    select: spreads(
        {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
        "select",
    ),
} as const
