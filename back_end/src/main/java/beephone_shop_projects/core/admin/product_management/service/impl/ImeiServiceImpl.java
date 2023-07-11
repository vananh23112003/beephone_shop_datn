package beephone_shop_projects.core.admin.product_management.service.impl;

import beephone_shop_projects.core.admin.product_management.repository.ImeiRepository;
import beephone_shop_projects.core.admin.product_management.service.IService;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.MauSac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ImeiServiceImpl implements IService<Imei> {

    @Autowired
    private ImeiRepository imeiRepository;

    @Override
    public Page<Imei> getAll(Pageable pageable) {
        return imeiRepository.findAll(pageable);
    }

    @Override
    public void insert(Imei imei) {
       imeiRepository.save(imei);
    }

    @Override
    public void update(Imei imei, String id) {
        imeiRepository.save(imei);
    }

    @Override
    public void delete(String id) {
        imeiRepository.deleteById(id);
    }

    public Imei getOne(String id){
        return imeiRepository.findById(id).get();
    }
}
