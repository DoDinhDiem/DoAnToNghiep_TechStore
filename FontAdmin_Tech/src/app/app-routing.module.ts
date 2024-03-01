import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './Layout/layout/layout.component'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./Pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'loai',
                loadChildren: () => import('./Pages/loai-san-pham/loai-san-pham.module').then((m) => m.LoaiSanPhamModule)
            },
            {
                path: 'hang',
                loadChildren: () => import('./Pages/hang-san-pham/hang-san-pham.module').then((m) => m.HangSanPhamModule)
            },
            {
                path: 'sanpham',
                loadChildren: () => import('./Pages/san-pham/san-pham.module').then((m) => m.SanPhamModule)
            },
            {
                path: 'sanpham/anhsanpham/:id',
                loadChildren: () => import('./Pages/anh-san-pham/anh-san-pham.module').then((m) => m.AnhSanPhamModule)
            },
            {
                path: 'sanpham/thongsosanpham/:id',
                loadChildren: () => import('./Pages/thong-so-san-pham/thong-so-san-pham.module').then((m) => m.ThongSoSanPhamModule)
            },
            {
                path: 'danhmuc',
                loadChildren: () => import('./Pages/danh-muc-tin-tuc/danh-muc-tin-tuc.module').then((m) => m.DanhMucTinTucModule)
            },
            {
                path: 'tintuc',
                loadChildren: () => import('./Pages/tin-tuc/tin-tuc.module').then((m) => m.TinTucModule)
            },
            {
                path: 'tintuc/anhtintuc/:id',
                loadChildren: () => import('./Pages/anh-tin-tuc/anh-tin-tuc.module').then((m) => m.AnhTinTucModule)
            },
            {
                path: 'tintuc/binhluantintuc/:id',
                loadChildren: () => import('./Pages/binh-luan-tin-tuc/binh-luan-tin-tuc.module').then((m) => m.BinhLuanTinTucModule)
            },
            {
                path: 'nhacungcap',
                loadChildren: () => import('./Pages/nha-cung-cap/nha-cung-cap.module').then((m) => m.NhaCungCapModule)
            },
            {
                path: 'hoadonnhap',
                loadChildren: () => import('./Pages/hoa-don-nhap/hoa-don-nhap.module').then((m) => m.HoaDonNhapModule)
            },
            {
                path: 'hoadonxuat',
                loadChildren: () => import('./Pages/hoa-don-xuat/hoa-don-xuat.module').then((m) => m.HoaDonXuatModule)
            },
            {
                path: 'chucvu',
                loadChildren: () => import('./Pages/chuc-vu/chuc-vu.module').then((m) => m.ChucVuModule)
            },
            {
                path: 'nhanvien',
                loadChildren: () => import('./Pages/nhan-vien/nhan-vien.module').then((m) => m.NhanVienModule)
            },
            {
                path: 'khachhang',
                loadChildren: () => import('./Pages/khach-hang/khach-hang.module').then((m) => m.KhachHangModule)
            },
            {
                path: 'role',
                loadChildren: () => import('./Pages/role/role.module').then((m) => m.RoleModule)
            },
            {
                path: 'slide',
                loadChildren: () => import('./Pages/slide/slide.module').then((m) => m.SlideModule)
            },
            {
                path: 'about',
                loadChildren: () => import('./Pages/about/about.module').then((m) => m.AboutModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('./Pages/contact/contact.module').then((m) => m.ContactModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
