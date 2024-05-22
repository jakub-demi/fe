import React from "react"
import { UserT } from "@/types"
import { Avatar, AvatarGroup } from "@mui/material"
import { getUserAvatar, getUserInitials } from "@/utils"
import Tooltip from "@mui/material/Tooltip"
import cltm from "@/utils/cltm"

const Avatars = ({
  users,
  maxAvatars = 3,
  className,
}: {
  users: UserT[]
  maxAvatars?: number
  className?: {
    group?: string
    avatar?: string
  }
}) => {
  return (
    <>
      {users.length > 0 ? (
        <AvatarGroup
          className={className?.group}
          max={maxAvatars}
        >
          {users.map((user) => (
            <Tooltip
              key={user.id}
              title={user.fullName}
              arrow
            >
              <Avatar
                className={cltm(
                  "bg-white border-2 border-primary-hover text-primary",
                  className?.avatar
                )}
                alt={user.fullName}
                src={getUserAvatar(user)}
              >
                {getUserInitials(user.fullName)}
              </Avatar>
            </Tooltip>
          ))}
        </AvatarGroup>
      ) : (
        <>-</>
      )}
    </>
  )
}
export default Avatars
