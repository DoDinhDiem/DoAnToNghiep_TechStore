import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class ScriptLoaderService {
    private scripts: any = {}

    loadScript(src: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Nếu script đã được tải trước đó, không tải lại
            if (this.scripts[src]) {
                resolve()
            } else {
                // Tạo một thẻ script
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = src
                script.onload = () => {
                    this.scripts[src] = true
                    resolve()
                }
                script.onerror = (error: any) => reject(`Could not load script ${src}`)
                document.body.appendChild(script)
            }
        })
    }
}
