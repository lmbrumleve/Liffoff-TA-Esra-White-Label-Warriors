package LaunchCode.project.controller;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/")
    public String addTransaction(@RequestBody Transaction transaction) {
        transactionService.saveTransaction(transaction);
        return "New transaction saved";

    }
}
