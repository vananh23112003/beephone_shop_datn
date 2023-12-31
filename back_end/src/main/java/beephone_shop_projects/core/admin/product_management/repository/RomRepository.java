package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.repository.IRomRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RomRepository extends IRomRepository {
    Page<Rom> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  rom SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Rom> findAllByDelected(Boolean delected);

    Rom findByKichThuoc(Integer kichThuoc);

    @Query(value = """
    SELECT CONCAT( 'ROM_',IF(count(*)  = 0,0,SUBSTRING(ma,5) + 1))   FROM rom
    """,nativeQuery = true)
    String getNewCode();
}
