import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './Layout/layout/layout.component'
import { AccountComponent } from './Pages/account/account.component'
import { AuthGuard } from './Guards/Auth.guard'
import { ResetPassComponent } from './Pages/reset-pass/reset-pass.component'
import { ChangePassComponent } from './Pages/change-pass/change-pass.component'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./Pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'loai',
                loadChildren: () => import('./Pages/loai-san-pham/loai-san-pham.module').then((m) => m.LoaiSanPhamModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'hang',
                loadChildren: () => import('./Pages/hang-san-pham/hang-san-pham.module').then((m) => m.HangSanPhamModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'sanpham',
                loadChildren: () => import('./Pages/san-pham/san-pham.module').then((m) => m.SanPhamModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'sanpham/anhsanpham/:id',
                loadChildren: () => import('./Pages/anh-san-pham/anh-san-pham.module').then((m) => m.AnhSanPhamModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'sanpham/thongsosanpham/:id',
                loadChildren: () => import('./Pages/thong-so-san-pham/thong-so-san-pham.module').then((m) => m.ThongSoSanPhamModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'danhmuc',
                loadChildren: () => import('./Pages/danh-muc-tin-tuc/danh-muc-tin-tuc.module').then((m) => m.DanhMucTinTucModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'tintuc',
                loadChildren: () => import('./Pages/tin-tuc/tin-tuc.module').then((m) => m.TinTucModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'tintuc/anhtintuc/:id',
                loadChildren: () => import('./Pages/anh-tin-tuc/anh-tin-tuc.module').then((m) => m.AnhTinTucModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'tintuc/binhluantintuc/:id',
                loadChildren: () => import('./Pages/binh-luan-tin-tuc/binh-luan-tin-tuc.module').then((m) => m.BinhLuanTinTucModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'nhacungcap',
                loadChildren: () => import('./Pages/nha-cung-cap/nha-cung-cap.module').then((m) => m.NhaCungCapModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'hoadonnhap',
                loadChildren: () => import('./Pages/hoa-don-nhap/hoa-don-nhap.module').then((m) => m.HoaDonNhapModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'hoadonxuat',
                loadChildren: () => import('./Pages/hoa-don-xuat/hoa-don-xuat.module').then((m) => m.HoaDonXuatModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_User, Role_Admin' }
            },
            {
                path: 'chucvu',
                loadChildren: () => import('./Pages/chuc-vu/chuc-vu.module').then((m) => m.ChucVuModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'nhanvien',
                loadChildren: () => import('./Pages/nhan-vien/nhan-vien.module').then((m) => m.NhanVienModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'khachhang',
                loadChildren: () => import('./Pages/khach-hang/khach-hang.module').then((m) => m.KhachHangModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'role',
                loadChildren: () => import('./Pages/role/role.module').then((m) => m.RoleModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'giamgia/:id',
                loadChildren: () => import('./Pages/giam-gia-active/giam-gia-active.module').then((m) => m.GiamGiaActiveModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'magiamgia',
                loadChildren: () => import('./Pages/ma-giam-gia/ma-giam-gia.module').then((m) => m.MaGiamGiaModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'slide',
                loadChildren: () => import('./Pages/slide/slide.module').then((m) => m.SlideModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'about',
                loadChildren: () => import('./Pages/about/about.module').then((m) => m.AboutModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'contact',
                loadChildren: () => import('./Pages/contact/contact.module').then((m) => m.ContactModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            },
            {
                path: 'feedback',
                loadChildren: () => import('./Pages/feed-back/feed-back.module').then((m) => m.FeedBackModule),
                canActivate: [AuthGuard],
                data: { allowedRoles: 'Role_Admin' }
            }
        ],
        canActivate: [AuthGuard],
        data: { allowedRoles: 'Role_User, Role_Admin' }
    },
    {
        path: 'login',
        component: AccountComponent
    },
    {
        path: 'resetpass',
        component: ResetPassComponent
    },
    {
        path: 'changepass',
        component: ChangePassComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
