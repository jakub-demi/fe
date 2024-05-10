import React from "react"
import { UserT } from "@/types"
import { Avatar, AvatarGroup } from "@mui/material"
import { getUserAvatar, getUserInitials } from "@/utils"
import Tooltip from "@mui/material/Tooltip"

const Avatars = ({ users }: { users: UserT[] }) => {
  return (
    <>
      {users.length > 0 ? (
        <AvatarGroup max={3}>
          {users.map((user) => (
            <Tooltip
              key={user.id}
              title={user.fullName}
              arrow
            >
              <Avatar
                className="bg-white border-2 border-primary-hover text-primary"
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
