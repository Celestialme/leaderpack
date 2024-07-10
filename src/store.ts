
import { writable, type Writable } from "svelte/store"

export let products_el:Writable<HTMLDivElement> = writable()
export let contact_el:Writable<HTMLDivElement> = writable()
export let header:Writable<HTMLDivElement> = writable()