import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx'
@Injectable({
    providedIn: 'root'
})
export class ExcelService {
    constructor() {}
    exportAsExcelFile(data: any[], headers: string[], fileName: string): void {
        const dataWithHeader = [headers, ...data]
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataWithHeader)
        const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        this.saveAsExcelFile(excelBuffer, fileName)
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/octet-stream' })
        const a: HTMLAnchorElement = document.createElement('a')
        document.body.appendChild(a)
        a.href = URL.createObjectURL(data)
        a.download = fileName + '_export_' + new Date().getTime() + '.xlsx'
        a.click()
        document.body.removeChild(a)
    }
}
