package beephone_shop_projects.core.admin.voucher_management.repository;

import beephone_shop_projects.core.admin.voucher_management.model.response.VoucherResponse;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.repository.IVoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface VoucherRepository extends IVoucherRepository, CustomVoucherRepository {

    @Query(value = """
             SELECT v.id, v.ma, v.ten, v.so_luong as soLuong,
                 v.gia_tri_toi_thieu as giaTriToiThieu, 
                 v.gia_tri_toi_da as giaTriToiDa, 
                 v.loai_voucher as loaiVoucher, 
                  v.ngay_bat_dau as ngayBatDau,
                 v.ngay_ket_thuc as ngayKetThuc,
                  v.gia_tri_voucher as giaTriVoucher,
                  v.dieu_kien_ap_dung as dieuKienApDung,
                  v.trang_thai as trangThai 
                  FROM voucher v WHERE v.id = ?1
            """, nativeQuery = true)
    VoucherResponse getOneVoucher(String id);

    @Transactional
    @Modifying
    @Query(value = """
            UPDATE Voucher v
            SET v.trangThai = CASE
                WHEN v.trangThai = 1 THEN 2
                WHEN v.trangThai = 2 THEN 1
                WHEN v.trangThai = 3 THEN 1
                ELSE v.trangThai
            END
            WHERE v.id = :idBanGhi
            """)
    void doiTrangThai(@Param("idBanGhi") String id);

    @Query(value = """
            SELECT v FROM Voucher v WHERE :date1 BETWEEN v.ngayBatDau AND v.ngayKetThuc AND v.trangThai <> :status
            """)
    List<Voucher> checkToStartBeforDateNowAndStatus(@Param("date1") Date dateTime, @Param("status") Integer status);

    @Query(value = """
            SELECT v FROM Voucher v WHERE v.ngayKetThuc < ?1 AND v.trangThai <> ?2
            """)
    List<Voucher> checkEndDateAndStatus(@Param("dateTime") Date dateTime, Integer status);

    @Query(value = """
            SELECT v FROM Voucher v WHERE v.ngayBatDau > ?1 AND v.trangThai <> ?2
            """)
    List<Voucher> checkToStartAfterAndStatus(@Param("dateTime") Date dateTime, Integer status);

}
