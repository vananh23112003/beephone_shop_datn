package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.repository.IChipRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChipRepository extends IChipRepository {

    Page<Chip> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  chip SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);


    List<Chip> findAllByDelected(Boolean delected);

    Chip findByTenChip(String tenChip);


    @Query(value = """
    SELECT CONCAT( 'CHIP_',IF(count(*)  = 0,0,SUBSTRING(ma,6) + 1))   FROM chip
    """,nativeQuery = true)
    String getNewCode();

}
