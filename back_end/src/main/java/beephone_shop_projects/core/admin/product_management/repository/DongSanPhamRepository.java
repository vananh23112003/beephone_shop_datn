package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.repository.IDongSanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DongSanPhamRepository extends IDongSanPhamRepository {
    Page<DongSanPham> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  dong_san_pham SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<DongSanPham> findAllByDelected(Boolean delected);

    DongSanPham findByTenDongSanPham(String tenDongSanPham);

    @Query(value = """
    SELECT CONCAT( 'DONGSANPHAM_',IF(count(*)  = 0,0,SUBSTRING(ma,13) + 1))   FROM dong_san_pham
    """,nativeQuery = true)
    String getNewCode();

}
