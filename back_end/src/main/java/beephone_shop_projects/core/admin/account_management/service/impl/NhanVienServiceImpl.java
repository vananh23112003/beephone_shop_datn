package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.RoleRepository;
import beephone_shop_projects.core.admin.account_management.service.NhanVienService;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Page<Account> getAllNV(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return accountRepository.getAllNV(pageable);
    }

    @Override
    public Account addNV(CreateAccountRequest request) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("NV%04d", number);
        Date date = null;
        try {
            date = new SimpleDateFormat("YYYY-MM-DD").parse(request.getNgaySinh());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        String hoVaTen = request.getHoVaTen();

        String hoVaTenWithoutSpaces = hoVaTen.replaceAll("\\s+", ""); // Loại bỏ khoảng trắng
        String hoVaTenWithoutDiacritics = removeDiacritics(hoVaTenWithoutSpaces);

        String[] specialCharsArray = {"!", "@", "#", "$", "%", "^", "&", "*", "+", "-"};
        String specialChars = getRandomSpecialChars(specialCharsArray);
        String matKhau = hoVaTenWithoutDiacritics + specialChars + code;
        Account kh = new Account().builder()
                .email(request.getEmail())
                .ngaySinh(date)
                .idRole(roleRepository.findByMa("Role1"))
                .hoVaTen(request.getHoVaTen())
                .trangThai(1)
                .ma(code)
                .matKhau(matKhau)
                .soDienThoai(request.getSoDienThoai())
                .diaChi(request.getDiaChi())
                .build();
        return accountRepository.save(kh);
    }

    @Override
    public void doiTrangThai(String id) {
        accountRepository.doiTrangThai(id);
    }

    @Override
    public Account updateNV(Account request, String id) {
        Optional<Account> optional = accountRepository.findById(id);
        if (optional.isPresent()) {

            optional.get().setMa(request.getMa());
            optional.get().setId(id);
            optional.get().setEmail(request.getEmail());
            optional.get().setDiaChi(request.getDiaChi());
            optional.get().setTrangThai(request.getTrangThai());
            optional.get().setDiaChi(request.getDiaChi());
            optional.get().setIdRole(roleRepository.findByMa("Role01"));
            optional.get().setMatKhau(request.getMatKhau());
            optional.get().setNgaySinh(request.getNgaySinh());
            optional.get().setHoVaTen(request.getHoVaTen());
            optional.get().setSoDienThoai(request.getSoDienThoai());
            accountRepository.save(optional.get());
            return accountRepository.save(optional.get());
        }
        return optional.get();
    }

    @Override
    public Page<Account> search(Optional<String> tenSearch, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 3);
        return accountRepository.searchAllKH(tenSearch, pageable);
    }

    public static String removeDiacritics(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replaceAll("[^\\p{Alnum}]+", "");
    }

    public static String getRandomSpecialChars(String[] specialCharsArray) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            int randomIndex = random.nextInt(specialCharsArray.length);
            sb.append(specialCharsArray[randomIndex]);
        }

        return sb.toString();
    }
}
