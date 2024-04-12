import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cltm = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export default cltm
