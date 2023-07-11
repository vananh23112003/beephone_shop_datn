package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.DongSanPhamRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DongSanPhamServiceImpl implements IService<DongSanPham> {

    @Autowired
    private DongSanPhamRepository dongSanPhamRepository;


    @Override
    public Page<DongSanPham> getAll(Pageable pageable) {
        return dongSanPhamRepository.findAll(pageable);
    }

    @Override
    public void insert(DongSanPham dongSanPham) {
       dongSanPhamRepository.save(dongSanPham);
    }

    @Override
    public void update(DongSanPham dongSanPham, String id) {
        dongSanPhamRepository.save(dongSanPham);
    }

    @Override
    public void delete(String id) {
        dongSanPhamRepository.deleteById(id);
    }

    public DongSanPham getOne(String id){
        return dongSanPhamRepository.findById(id).get();
    }
}
