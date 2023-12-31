package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.DiaChiRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.AccountService;
import beephone_shop_projects.entity.Account;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private DiaChiRepository diaChiRepository;

    @Override
    public Page<Account> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 3);
        return accountRepository.findAll(pageable);
    }


    @Override
    public Account addAcc(@Valid CreateAccountRequest request) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("ACC%04d", number);
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-mm-dd").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        Account kh = new Account().builder()
                .email(request.getEmail())
                .ngaySinh(date).idRole(roleRepository.findById(request.getIdRole()).get())
                .hoVaTen(request.getHoVaTen())
                .ma(code).matKhau(request.getMatKhau())
                .soDienThoai(request.getSoDienThoai())
                .diaChi(request.getDiaChi())
                .trangThai(request.getTrangThai()).build();
        return accountRepository.save(kh);
    }

    @Override
    public Account getOneAcc(UUID id) {
        return accountRepository.findById(String.valueOf(id)).get();
    }


    @Override
    public Account updateAcc(CreateAccountRequest request, String id) {
        Optional<Account> khachHangOptional = accountRepository.findById(id);
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-mm-dd").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        khachHangOptional.get().setMa(request.getMa());
        khachHangOptional.get().setEmail(request.getEmail());
        khachHangOptional.get().setDiaChi(request.getDiaChi());
        khachHangOptional.get().setIdRole(roleRepository.findById(request.getIdRole()).get());
        khachHangOptional.get().setMatKhau(request.getMatKhau());
        khachHangOptional.get().setNgaySinh(date);
        khachHangOptional.get().setHoVaTen(request.getHoVaTen());
        khachHangOptional.get().setSoDienThoai(request.getSoDienThoai());
        accountRepository.save(khachHangOptional.get());
        return khachHangOptional.get();
    }

    @Override
    public Boolean deleteAcc(String id) {
        accountRepository.deleteById(id);
        return true;
    }

//    @Override
//    public Page<KhachHang> search(Optional<String> tenSearch, Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo, 3);
//        return accountRepository.searchAll(tenSearch, pageable);
//
//    }
}
