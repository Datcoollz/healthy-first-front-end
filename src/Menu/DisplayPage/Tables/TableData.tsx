import { shop, s } from '../../../Interface/Shop';
import { ward } from '../../../Interface/Ward';

export function getShops() { return fetch("/api/shops", { method: 'GET' }) }

export function getShop(id: number) { return fetch("/api/shops/" + id.toString(), { method: 'GET' }) }

export function addShop(shop: shop) {
    return fetch('/api/shops/create', {
        method: 'POST',
        body: JSON.stringify(shop),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function editShop(id: number, s: s) {
    return fetch("/api/shops/" + id.toString(), {
        method: 'PUT',
        body: JSON.stringify(s),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function deleteShop(id: number) { return fetch('/api/shops/' + id.toString(), { method: 'DELETE' }) }

export function getDistricts() { return fetch("/api/districts", { method: 'GET' }) }

export function getDistrict(id: number) {
    return fetch("/api/districts/" + id.toString(), { method: 'GET' })
}

export function addDistrict(name: string) {
    return fetch('/api/districts/create/', {
        method: 'POST',
        body: JSON.stringify({ name: name }),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function deleteDistrict(id: number) { return fetch("/api/districts/" + id.toString(), { method: 'DELETE' }) }

export function putDistrict(id: number, name: string) {
    return fetch("/api/districts/" + id.toString(), {
        method: 'PUT',
        body: JSON.stringify({ name: name }),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function getWards() { return fetch("/api/wards", { method: 'GET' }) }

export function getWard(id: number) { return fetch("/api/wards/" + id.toString(), { method: 'GET' }) }

export function addWard(name: string, districtId: number) {
    return fetch('/api/wards/create', {
        method: 'POST',
        body: JSON.stringify({ name: name, districtId: districtId }),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function deleteWard(id: number) { return fetch("/api/wards/" + id.toString(), { method: 'DELETE' }) }

export function editWard(id: number, dId: number, n: string) {
    return fetch('/api/wards/' + id.toString(), {
        method: 'PUT',
        body: JSON.stringify({
            districtId: dId,
            name: n
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function getCertificates(shop_id: number, page: number, item_per_page: number) {
    return fetch("/api/certificates?" + new URLSearchParams({
        "shop": shop_id.toString(), "p": page.toString(), "l": item_per_page.toString()
    }), { method: 'GET', })
}

export function getPlans() { return fetch("/api/plans", { method: "GET" }) }

export function getPlan(id: number) { return fetch("/api/plans/" + id.toString(), { method: "GET" }) }

export function getActivities() {return fetch("api/activities", { method: 'GET' })}