package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void updateTransaction(int id, String name, String description, double amount, String currency){
        Transaction update = transactionRepository.findById(id).get();
        update.setName(name);
        update.setDescription(description);
        update.setAmount(amount);
        update.setCurrency(currency);
        transactionRepository.save(update);
    ;}
    @Override
    public Optional<Transaction> transactionById(int id) {return transactionRepository.findById(id);}
    @Override
    public void deleteTransaction(Transaction response) {transactionRepository.delete(response);}
    @Override
    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public List<Transaction> searchTransactionsByName(String name) {
        return transactionRepository.queryByName(name);
    }

    @Override
    public List<Transaction> searchTransactionsByAmount(double amount) {
        return transactionRepository.queryByAmount(amount);
    }
}
