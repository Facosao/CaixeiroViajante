fn gen_all(available: Vec<i32>, collect: Vec<i32>, index: i32) {
    for num in &available {
        let mut new_collect = collect.clone();
        new_collect.push(*num);
        
        let mut new_available = available.clone();
        
        for i in 0..available.len() {
            if available[i] == *num {
                new_available.remove(i);
            }
        }
        
        gen_all(new_available, new_collect, index + 1);
    }
    
    if available.len() == 0 {
        println!("{:?}", collect);
    }
}

fn main() {
    gen_all(vec![1, 2, 3, 4], vec![], 0)
}