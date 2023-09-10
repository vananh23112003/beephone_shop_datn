package beephone_shop_projects.core.admin.promotion_management.service.impl;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.repository.SanPhamKhuyenMaiRepository;
import beephone_shop_projects.core.admin.promotion_management.service.SanPhamKhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamKhuyenMaiServiceImpl implements SanPhamKhuyenMaiService {

    @Autowired
    private SanPhamKhuyenMaiRepository sanPhamKhuyenMaiRepository;

    @Override
    public List<SanPhamKhuyenMaiResponse> getAllSanPham() {
        return sanPhamKhuyenMaiRepository.findSanPhamKhuyenMai();
    }
}
