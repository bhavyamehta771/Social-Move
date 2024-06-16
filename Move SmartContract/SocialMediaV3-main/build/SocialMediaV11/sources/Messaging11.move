module addr::Messaging11 {

    use aptos_framework::string::{String};
    use std::string;
    use std::string::{utf8};
    use aptos_std::table;
    use std::signer;
    use std::vector;
    use aptos_std::fixed_point64;
    use std::debug;
    // use aptos_framework::account;
    // use aptos_std::fixed_point64::FixedPoint64;


    // revert from this fixed point
   

    struct Message has store,copy,drop  {
        sender: address,
        receiver: address,
        message: string::String,
        time: string::String,
        date:string::String,
    }

     struct Question has store,copy {
        question_id: u64,
        question: string::String,
        bet_cost_yes: u128,
        bet_cost_no: u128,
        total_yes_bets: u128,
        total_no_bets: u128,
        end_time: string::String,
        yes_bets: vector<address>,
        no_bets: vector<address>,
        answered: bool,
        status: string::String,
    }



      struct Blog has store,copy {
        post_url: string::String,
        likes: u64,
        // views: u64,
        categories: vector<string::String>,
        owner: address,
        tips: u64,
    }

     #[event]
    struct Help_Builders_Event has store, drop {
        project_name: String,
        project_owner: address,
    }

    #[event]
    struct Created_Question_Event has store, drop {
        Question: String,
        
    }

    #[event]
    struct Placed_Bet_Event has store, drop {
        question_id: u64,
        selected_option: bool,
    }

    #[event]
    struct Completed_Question_Event has store, drop {
        question_id: u64,
        selected_option: bool,
        winner_amount: fixed_point64::FixedPoint64,
    }

    #[event]
    struct Message_Event has store, drop {
        sender: address,
        receiver: address,
        message: String,
    }

    #[event]
    struct User_Event has store, drop {
        username: String,
    }

    #[event]
    struct Post_Event has store, drop {
        post_url: String,
        owner: address,
    }

    #[event]
    struct Blog_Event has store, drop {
        post_url: String,
        owner: address,
    }

    struct Help_Builders has store, copy {
        project_name: string::String,
        project_description: string::String,
        project_url: string::String,
        project_owner: address,
        demo_video_link: string::String,
        calendly_link: string::String,
        grants_required: u128,
        grants_received: u128,
        reason : string::String,
        telegram_link: string::String,
    }

       struct Post has store, copy {
        owner: address,
        post_url: string::String,
        caption: string::String,
        likes: u64,
        tips: u64,
    }
    struct User_Questions has store, copy {
        question_id: u64,
        question: string::String,
        status: string::String,
        bet_cost_yes: u128,
        bet_cost_no: u128,
        chose_bet:bool,
    }
    struct User_Question_Vector has store, copy{
        array: vector<User_Questions>,
    }
    struct User has store, copy {
        name: string::String,
        username: string::String,
        profile_url: string::String,
        interests: vector<string::String>,
        tokens: fixed_point64::FixedPoint64,
        posts: vector<u64>,
        blogs: vector<u64>,
        builders_posts: vector<u64>,
        saved_posts: vector<u64>,
        tips: u128,
        won_tokens: fixed_point64::FixedPoint64,
    }


     struct GmbuildersResource has key {
        users: table::Table<address, User>,
        post: table::Table<u64, Post>,
        blogs: table::Table<u64, Blog>,
        builders_posts: table::Table<u64, Help_Builders>,
        questions: table::Table<u64, Question>,
        answered_questions: table::Table<address,User_Question_Vector>,


    }

    struct MessageResource has key{
        message: table::Table<address, vector<Message> >,
        friends: vector<address>,
    }

       /// Global state variables
    struct GlobalState has key {
        post_index: u64,
        blog_index: u64,
        question_index: u64,
        builders_index: u64,
        GARI_token_pool: fixed_point64::FixedPoint64,
        ongoing_questions: vector<u64>,
        completed_questions: vector<u64>,
    }

    
     fun init_module(owner: &signer) {
        // assert!(signer::address_of(owner) == @addr, 1); // Ensure only one-time initialization by a specific address

        let global_state = GlobalState {
            post_index: 0,
            blog_index: 0,
            question_index: 0,
            builders_index:0,
            GARI_token_pool: fixed_point64::create_from_raw_value(50_000_000),
            ongoing_questions: vector::empty<u64>(),
            completed_questions: vector::empty<u64>(),
        };

        move_to(owner, global_state);

         let users_table = table::new<address, User>();
        let post_table = table::new<u64, Post>();
        let blogs_table = table::new<u64, Blog>();
        let question_table = table::new<u64, Question>();
        let builders_table = table::new<u64, Help_Builders>();
        let user_question_table = table::new<address, User_Question_Vector>();

        // let message_table=table::new<address, table::Table<address, vector<Message> >> ();
        let resource = GmbuildersResource {
            users: users_table,
            post: post_table,
            blogs: blogs_table,
            builders_posts: builders_table,
            questions: question_table,  
            answered_questions: user_question_table,
        };
        move_to(owner, resource);
    }

    public entry fun create_question(
        sender: &signer,
        _question: string::String,
        _bet_cost_yes: u128,
        _bet_cost_no: u128,
        _end_time: string::String,
    ) acquires GmbuildersResource,GlobalState {
        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);
        assert!(sender_address == @addr, 1); // Ensure that only the owner can create a question

        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _question_id = global_state_ref.question_index;
        global_state_ref.question_index = global_state_ref.question_index + 1;

        let new_question = Question {
            question_id: _question_id,
            question: _question,
            bet_cost_yes: _bet_cost_yes,
            bet_cost_no: _bet_cost_no,
            total_yes_bets: 0,
            total_no_bets: 0,
            end_time: _end_time,
            yes_bets: vector::empty<address>(),
            no_bets: vector::empty<address>(),
            answered: false,
            status: utf8(b"Ongoing"),
        };

        // Store question data
        table::add(&mut resource.questions, _question_id, new_question);

        // Update ongoing questions index
        vector::push_back(&mut global_state_ref.ongoing_questions, _question_id);

        // Emit event
        // let event = Created_Question_Event {
        //     Question: _question,
        // };
        // 0x1::event::emit(event);
    }

    public entry fun place_bet_question(
        sender: &signer,
        _question_id: u64,
        _selected_option: bool,
    ) acquires GmbuildersResource {
        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);

        let question = table::borrow_mut(&mut resource.questions, _question_id);
        assert!(!vector::contains(&question.yes_bets,&sender_address), 1); // Ensure that the question is not already answered
        assert!(!vector::contains(&question.no_bets,&sender_address), 1); // Ensure that the question is not already answered

        let user = table::borrow_mut(&mut resource.users, sender_address);
        if(_selected_option){
            assert!(fixed_point64::greater_or_equal(user.tokens , fixed_point64::create_from_raw_value(question.bet_cost_yes)), 2); 
        user.tokens =fixed_point64::sub(user.tokens, fixed_point64::create_from_raw_value(question.bet_cost_yes));
         question.total_yes_bets = question.total_yes_bets + question.bet_cost_yes;
            vector::push_back(&mut question.yes_bets, sender_address);
        }
        else {
            assert!(fixed_point64::greater_or_equal(user.tokens,fixed_point64::create_from_raw_value(question.bet_cost_no)), 2);
        user.tokens = fixed_point64::sub(user.tokens, fixed_point64::create_from_raw_value(question.bet_cost_no));
         question.total_no_bets = question.total_no_bets + question.bet_cost_no;
            vector::push_back(&mut question.no_bets, sender_address);

            };

        

        let user_question = table::borrow_mut(&mut resource.answered_questions, sender_address);


            let new_user_question = User_Questions {
                question_id: _question_id,
                question: question.question,
                status: question.status,
                bet_cost_yes: question.bet_cost_yes,
                bet_cost_no: question.bet_cost_no,
                chose_bet: _selected_option,
            };
            vector::push_back(&mut user_question.array, new_user_question);


       

        // // Emit event
        // let event = Placed_Bet_Event {
        //     question_id: _question_id,
        //     selected_option: _selected_option,
        // };
        // 0x1::event::emit(event);
    }

    public entry fun calculate_result_of_question(
        sender: &signer,
        _question_id: u64,
        _selected_option: bool,
    ) acquires GmbuildersResource,GlobalState {
        let sender_address = signer::address_of(sender);
        assert!(sender_address == @addr, 1); // Ensure that only the owner can calculate the result
        let resource = borrow_global_mut<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global_mut<GlobalState>(@addr);


        let question = table::borrow_mut(&mut resource.questions, _question_id);
        debug::print(&question.answered);
        assert!(!question.answered, 1); // Ensure that the question is not already answered

        let total_yes_bets:u128  = question.total_yes_bets;
        let total_no_bets:u128  = question.total_no_bets;

        let total_bets:u128 = total_yes_bets + total_no_bets;
        debug::print(&total_bets);
        // let ninety_seven_percent =fixed_point64::create_from_rational(97, 100);
        // let random1 =fixed_point64::multiply_u128(total_bets,fixed_point64::create_from_raw_value(97));
        let random1:u128 =total_bets*97;
        debug::print(&random1);
        let n1:u128 = 100;
        let winner_amount =fixed_point64::create_from_rational(random1,n1); // 97% of the total bets
        debug::print(&winner_amount);

        // let three_percent =fixed_point64::create_from_rational(97, 100);
        // let random2 =fixed_point64::multiply_u128(total_bets,fixed_point64::create_from_raw_value(3));
        let random2:u128 =total_bets*3;

        let platform_fee = fixed_point64::create_from_rational(random2,n1); // 3% of the total bets
        global_state_ref.GARI_token_pool = fixed_point64::add(global_state_ref.GARI_token_pool,platform_fee);

        

        if (_selected_option==true) {
            debug::print(&_selected_option);
            let i = 0;
            // debug::print(b"true and i");
            let len =vector::length(&question.yes_bets);
            while (i < len) {
                debug::print(&i);
                let user_address = *vector::borrow(&question.yes_bets, i);
                let user_questions = table::borrow_mut(&mut resource.answered_questions, user_address);

                let user_answer_length = vector::length(&user_questions.array);
                // debug::print(&user_answer_length);
                let  j = 0;
                // debug::print(b"true and j");
                while (j < user_answer_length) {
                    debug::print(&j);
                    let user_question = vector::borrow_mut(&mut user_questions.array, j);
                    if (user_question.question_id == _question_id) {
                        user_question.status = utf8(b"Won");
                        // debug::print(user_question.status);
                        break
                    };
                    j = j + 1;
                };
                let user = table::borrow_mut(&mut resource.users, user_address);
                
                user.tokens = fixed_point64::add(user.tokens,  winner_amount);
                user.won_tokens = fixed_point64::add(user.won_tokens,  winner_amount);
                i = i + 1;
            };
            let l = 0;
            let len1 = vector::length(&question.no_bets);
            while (l < len1) {
                let user_address = *vector::borrow(&question.no_bets, l);
                let user_questions = table::borrow_mut(&mut resource.answered_questions, user_address);

                // let user = table::borrow_mut(&mut resource.users, user_address);
                let user_answer_length = vector::length(&user_questions.array);
                let k = 0;
                while (k < user_answer_length) {
                    let user_question = vector::borrow_mut(&mut user_questions.array, k);
                    if (user_question.question_id == _question_id) {
                        user_question.status = utf8(b"Lost");
                        break
                    };
                    k = k + 1;
                };
                l = l + 1;
            };
        } else {
            let i = 0;
            let len2 = vector::length(&question.no_bets);
            while (i < len2) {
                let user_address = *vector::borrow(&question.no_bets, i);                
                let user_questions = table::borrow_mut(&mut resource.answered_questions, user_address);
                let user_answer_length = vector::length(&user_questions.array);


                let j = 0;
                while (j < user_answer_length) {
                    let user_question = vector::borrow_mut(&mut user_questions.array, j);
                    if (user_question.question_id == _question_id) {
                        user_question.status = utf8(b"Won");
                        break
                    };
                    j = j + 1;
                };
               
                let user = table::borrow_mut(&mut resource.users, user_address);
                user.tokens = fixed_point64::add(user.tokens,  winner_amount);
                user.won_tokens = fixed_point64::add(user.won_tokens,  winner_amount);
                i = i + 1;
            };
            let l = 0;
            let len3 = vector::length(&question.yes_bets);
            while (l < len3) {
                let user_address = *vector::borrow(&question.yes_bets, l);
                let user_questions = table::borrow_mut(&mut resource.answered_questions, user_address);

                // let user = table::borrow_mut(&mut resource.users, user_address);
                let user_answer_length = vector::length(&user_questions.array);
                let k = 0;
                while (k < user_answer_length) {
                    let user_question = vector::borrow_mut(&mut user_questions.array, k);
                    if (user_question.question_id == _question_id) {
                        user_question.status = utf8(b"Lost");
                        break
                    };
                    k = k + 1;
                };
                l = l + 1;
            };
        };

        // Update completed questions index
        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        while (vector::contains(&global_state_ref.ongoing_questions, &_question_id)) {
            let (boo,ind) = vector::index_of(&global_state_ref.ongoing_questions, &_question_id);
            vector::remove(&mut global_state_ref.ongoing_questions, ind);
            // vector::remove(&mut global_state_ref.ongoing_questions, _question_id);
        };
        // vector::remove(&mut global_state_ref.ongoing_questions, _question_id);
        vector::push_back(&mut global_state_ref.completed_questions, _question_id);
        question.answered = true;
        question.status = utf8(b"Completed");

        // Emit event
        let event = Completed_Question_Event {
            question_id: _question_id,
            selected_option: _selected_option,
            winner_amount: winner_amount,
        };
        0x1::event::emit(event)
    }
    
    
    

    public entry fun edit_builders_post(
        sender: &signer,
        _post_index: u64,
        _project_name: string::String,
        _project_description: string::String,
        _project_url: string::String,
        _demo_video_link: string::String,
        _calendly_link: string::String,
        _grants_required: u128,
        _reason: string::String,
        _telegram_link: string::String,
    ) acquires GmbuildersResource {
        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);

        let post = table::borrow_mut(&mut resource.builders_posts, _post_index);
        assert!(post.project_owner == sender_address, 1); // Ensure that only the owner can edit the post

        post.project_name = _project_name;
        post.project_description = _project_description;
        post.project_url = _project_url;
        post.demo_video_link = _demo_video_link;
        post.calendly_link = _calendly_link;
        post.grants_required = _grants_required;
        post.reason = _reason;
        post.telegram_link = _telegram_link;

         let event = Help_Builders_Event {
        project_name: _project_name,
        project_owner: sender_address,
    };
    0x1::event::emit(event);
    }

    

    public entry fun create_builders_post (
        sender: &signer,
        _project_name: string::String,
        _project_description: string::String,
        _project_url: string::String,
        _demo_video_link: string::String,
        _calendly_link: string::String,
        _grants_required: u128,
        _reason: string::String,
        _telegram_link: string::String,
    ) acquires GmbuildersResource,GlobalState {

        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);
        let user = table::borrow_mut(&mut resource.users, sender_address);


        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _post_index = global_state_ref.builders_index;
global_state_ref.builders_index =  _post_index + 1;
        // global_state_ref.builders_index = _post_index + 1;

        let new_post = Help_Builders {
            project_name: _project_name,
            project_description: _project_description,
            project_url: _project_url,
            project_owner: sender_address,
            demo_video_link: _demo_video_link,
            calendly_link: _calendly_link,
            grants_required: _grants_required,
            grants_received: 0,
            reason: _reason,
            telegram_link: _telegram_link,
        };

        // Store post data
        table::add(&mut resource.builders_posts, _post_index, new_post);

        // Update user post index
        vector::push_back(&mut user.builders_posts, _post_index);

         let event = Help_Builders_Event {
        project_name: _project_name,
        project_owner: sender_address,
    };
    0x1::event::emit(event);
    }
    

    public entry fun send_message(
        sender: &signer,
        receiver: address,
        message: string::String,
        time: string::String,
        date: string::String,
    ) acquires MessageResource {
        let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<MessageResource>(sender_address);



        let new_message = Message {
            sender: sender_address,
            receiver: receiver,
            message: message,
            time: time,
            date: date,
        };

        let user_messages = table::borrow_mut_with_default(&mut resource.message, receiver, vector::empty());
        vector::push_back(user_messages, new_message);
         if (!vector::contains(&resource.friends, &receiver)) {
            vector::push_back(&mut resource.friends, receiver);
        };
        let resource1 = borrow_global_mut<MessageResource>(receiver);

         let user_messages1 = table::borrow_mut_with_default(&mut resource1.message, sender_address, vector::empty());
        vector::push_back(user_messages1, new_message);
if (!vector::contains(&resource1.friends, &sender_address)) {
            vector::push_back(&mut resource1.friends, sender_address);
        };

         // Emit event
    let event = Message_Event {
        sender: sender_address,
        receiver: receiver,
        message: message,
    };
    0x1::event::emit(event);
       
    }

    /// Registers a new user
    public entry fun register_user(
        account: &signer, 
        name: string::String, 
        username: string::String, 
        profile_url: string::String, 
        interests: vector<string::String>
    )  acquires GmbuildersResource,GlobalState {
        let user_address = signer::address_of(account);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);
        // let message_resource=borrow_global_mut<MessageResource>(user_address);
        let empty_vector = vector::empty<User_Questions>();
        let user_question_vector = User_Question_Vector {
            array: empty_vector,
        };
        table::add(&mut resource.answered_questions, user_address, user_question_vector);

        let new_message =table::new<address, vector<Message>>();
        let new_friends =vector::empty<address>();
        let message_instance = MessageResource{
            message:new_message,
            friends:new_friends,
        };
        move_to(account, message_instance);
        


// update global token
let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _total_token = global_state_ref.GARI_token_pool;
        global_state_ref.GARI_token_pool =fixed_point64::add(_total_token,fixed_point64::create_from_raw_value(1));

        let new_user = User {
            name: name,
             username: username,
            profile_url: profile_url,
            interests: interests,
            tokens: fixed_point64::create_from_raw_value(50),
            blogs: vector::empty<u64>(),

            posts: vector::empty<u64>(),
            builders_posts: vector::empty<u64>(),
            saved_posts: vector::empty<u64>(),
            tips: 0,
            won_tokens: fixed_point64::create_from_raw_value(0),
        };

        // Store user data
        table::add(&mut resource.users, user_address, new_user);

              // Emit event
    let event = User_Event {
        username:username,
    };
    0x1::event::emit(event);

    }

  public entry fun create_blog(
        account: &signer, 
        _post_url: String, 
        categories: vector<String>
        
    ) acquires GlobalState, GmbuildersResource {
        let user_address = signer::address_of(account);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);

        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _post_index = global_state_ref.blog_index;
        global_state_ref.blog_index = _post_index + 1;

        
        let user = table::borrow_mut(&mut resource.users, user_address);
        assert!(fixed_point64::greater_or_equal(user.tokens,fixed_point64::create_from_raw_value(2)), 3); // Ensure that user has enough tokens for creating a post
        user.tokens =fixed_point64::sub(user.tokens,fixed_point64::create_from_raw_value(2));
         let _global_tokens = global_state_ref.GARI_token_pool;
        global_state_ref.GARI_token_pool =fixed_point64::add(_global_tokens,fixed_point64::create_from_raw_value(2));

        let new_post = Blog {
            owner: user_address,
            post_url:_post_url,
            likes: 0,
             tips: 0,
             categories:categories,
        };

        // Store post data
        // move_to(user, new_post);
        table::add(&mut resource.blogs, _post_index, new_post);

        // Update user post index
        vector::push_back(&mut user.blogs, _post_index);

        // Emit event
    let event = Blog_Event {
        post_url: _post_url,
        owner: user_address,
    };
    0x1::event::emit(event);

    }

    /// Allows a user to create a new post
    public entry fun create_post(
        account: &signer, 
        _post_url: string::String, 
        _caption: string::String
        
    ) acquires GlobalState, GmbuildersResource {
        let user_address = signer::address_of(account);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);

        let global_state_ref = borrow_global_mut<GlobalState>(@addr);
        let _post_index = global_state_ref.post_index;
        global_state_ref.post_index = _post_index + 1;

        
        let user = table::borrow_mut(&mut resource.users, user_address);
        assert!(fixed_point64::greater_or_equal(user.tokens,fixed_point64::create_from_raw_value(2)), 3); // Ensure that user has enough tokens for creating a post
        user.tokens =fixed_point64::sub(user.tokens,fixed_point64::create_from_raw_value(2));
         let _global_tokens = global_state_ref.GARI_token_pool;
        global_state_ref.GARI_token_pool = fixed_point64::add(_global_tokens,fixed_point64::create_from_raw_value(2));

        let new_post = Post {
            owner: user_address,
            post_url:_post_url,
            caption: _caption,
            likes: 0,
             tips: 0,
        };

        // Store post data
        // move_to(user, new_post);
        table::add(&mut resource.post, _post_index, new_post);

        // Update user post index
        vector::push_back(&mut user.posts, _post_index);


        
      // Emit event
    let event = Post_Event {
       post_url: _post_url,
        owner: user_address,
    };
    0x1::event::emit(event);
    }

    public entry fun tip_builders(
        account: &signer, 
        _post_index: u64,
        _tip:u128
    ) acquires GmbuildersResource {
        let user_address = signer::address_of(account);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);

        let user = table::borrow_mut(&mut resource.users, user_address);
        assert!(fixed_point64::greater_or_equal(user.tokens,fixed_point64::create_from_raw_value(_tip)) , 3); // Ensure that user has enough tokens for tipping
        user.tokens =fixed_point64::sub(user.tokens,fixed_point64::create_from_raw_value(_tip));

        let post = table::borrow_mut(&mut resource.builders_posts, _post_index);
        post.grants_received =  post.grants_received + _tip;

        let owner = table::borrow_mut(&mut resource.users, post.project_owner);
        owner.tokens = fixed_point64::add(owner.tokens,fixed_point64::create_from_raw_value(_tip));
    }

    

public entry fun save_post(
    account: &signer, 
    _post_index: u64
) acquires GmbuildersResource {
    let user_address = signer::address_of(account);
    let resource = borrow_global_mut<GmbuildersResource>(@addr);

    let user = table::borrow_mut(&mut resource.users, user_address);

    // Check if the post is already saved
    let saved_posts_len = vector::length(&user.saved_posts);
    let  i = 0;
    while (i < saved_posts_len) {
        let condition = *vector::borrow(&user.saved_posts, i) == _post_index;
        if (condition) {
            return () // Exit the function if the post is already saved
        };
        i = i + 1;
    };

    // Add the post if it's not already saved
    vector::push_back(&mut user.saved_posts, _post_index);
}




    /// Allows a user to like a post
    public entry fun like_post(_user: &signer, _post_id: u64) acquires GmbuildersResource {
       let resource = borrow_global_mut<GmbuildersResource>(@addr);

       let post = table::borrow_mut(&mut resource.post, _post_id);
        post.likes = post.likes + 1;

        // let user = table::borrow_mut(&mut resource.users, post.owner);
        // user.tokens =fixed_point64::add(user.tokens,fixed_point64::create_from_raw_value(1));
    }

    /// Allows a user to tip another user
    public entry fun tip_user(_sender: &signer, _receiver_address: address, _no_of_tokens: u128) acquires GmbuildersResource {
        let sender_address = signer::address_of(_sender);
        let resource = borrow_global_mut<GmbuildersResource>(@addr);

        let sender = table::borrow_mut(&mut resource.users, sender_address);

        assert!(fixed_point64::greater_or_equal(sender.tokens, fixed_point64::create_from_raw_value(_no_of_tokens)), 3); // Ensure sender has enough tokens

        // Deduct tokens from sender
        sender.tokens =fixed_point64::sub(sender.tokens,fixed_point64::create_from_raw_value(_no_of_tokens));

        let receiver = table::borrow_mut(&mut resource.users, _receiver_address);
        // Add tokens to receiver
        receiver.tokens =fixed_point64::add(receiver.tokens, fixed_point64::create_from_raw_value(_no_of_tokens))  ;

        // Update tips count for receiver
        receiver.tips = receiver.tips + _no_of_tokens;
    }

    // enable the user to buy GARI tokens
    // public entry fun buy_tokens<CoinType>(user: &signer, no_of_tokens: u64) acquires GmbuildersResource {
    //     let user_address = signer::address_of(user);
    //     let cost = no_of_tokens * 1_000_000; // Assuming 0.001 Aptos Coin per token, scaled to 6 decimal places
    //     let user_balance = balance<AptosCoin>(user_address);
    //     let resource = borrow_global_mut<GmbuildersResource>(@addr);

    //     assert!(user_balance >= cost, 3); // Ensure user has enough Aptos Coin

    //     // Deduct Aptos Coin from user
    //     let _withdrawn_coin =  coin::withdraw<CoinType>(user, cost);
    //     coin::deposit(@addr, _withdrawn_coin);

    //     // Add GARI tokens to user
    //     let user_ref = table::borrow_mut(&mut resource.users, user_address);
    //     user_ref.tokens = user_ref.tokens + no_of_tokens;

    //     // Deduct from GARI token pool
    //     let global_state_ref = borrow_global_mut<GlobalState>(@addr);
    //     global_state_ref.GARI_token_pool = global_state_ref.GARI_token_pool - no_of_tokens;
    // }

    #[view]
    public fun get_user_profile(user_address: address): User acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        *table::borrow(&resource.users, user_address)
    }

    #[view]
    public fun view_post_detail(post_id: u64): Post acquires GmbuildersResource {
       let resource = borrow_global<GmbuildersResource>(@addr);
        *table::borrow(&resource.post, post_id)
    }

      #[view]
    public fun view_blog_detail(post_id: u64): Blog acquires GmbuildersResource {
       let resource = borrow_global<GmbuildersResource>(@addr);
        *table::borrow(&resource.blogs, post_id)
    }

  
    #[view]
      public  fun recieve_message(
        sender: address,
        reciever: address,
       
    ):vector<Message> acquires MessageResource {
        // let sender_address = signer::address_of(sender);
        let resource = borrow_global_mut<MessageResource>(sender);
        *table::borrow(&resource.message, reciever)
        
        }

        #[view]
        public fun get_friends(sender: address):vector<address> acquires MessageResource {
        // let sender_address = signer::address_of(sender);
        let resource = borrow_global<MessageResource>(sender);
        return resource.friends
        }

        #[view]
        public fun get_builders_post_detail(post_id: u64): Help_Builders acquires GmbuildersResource {
         let resource = borrow_global<GmbuildersResource>(@addr);
        *table::borrow(&resource.builders_posts, post_id)

        }

        #[view]
        public fun get_all_builders_posts(): vector<addr::Messaging11::Help_Builders> acquires GmbuildersResource,GlobalState {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let _post_index = global_state_ref.builders_index;
        let  all_posts = vector::empty<addr::Messaging11::Help_Builders>();
        let  i = 0;
        while (i < _post_index) {
            let temp = *table::borrow(&resource.builders_posts, i);
            vector::push_back(&mut all_posts, temp);
            i = i + 1;
        };
        all_posts
        }

       #[view]
    public fun view_all_posts(): vector<addr::Messaging11::Post> acquires GmbuildersResource,GlobalState {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let _post_index = global_state_ref.post_index;
        let  all_posts = vector::empty<addr::Messaging11::Post>();
        let  i = 0;
        while (i < _post_index) {
            let temp = *table::borrow(&resource.post, i);
            vector::push_back(&mut all_posts, temp);
            i = i + 1;
        };
        all_posts
    }

      #[view]
    public fun view_all_blogs(): vector<addr::Messaging11::Blog> acquires GmbuildersResource,GlobalState {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let _post_index = global_state_ref.blog_index;
        let  all_posts = vector::empty<addr::Messaging11::Blog>();
        let  i = 0;
        while (i < _post_index) {
            let temp = *table::borrow(&resource.blogs, i);
            vector::push_back(&mut all_posts, temp);
            i = i + 1;
        };
        all_posts
    }

     #[view]
    public fun is_user_registered(user_address: address): bool acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        table::contains(&resource.users, user_address)
    }

    #[view]
    public fun get_all_questions(): vector<addr::Messaging11::Question> acquires GmbuildersResource,GlobalState {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let _question_index = global_state_ref.question_index;
        let  all_questions = vector::empty<addr::Messaging11::Question>();
        let  i = 0;
        while (i < _question_index) {
            let temp = *table::borrow(&resource.questions, i);
            vector::push_back(&mut all_questions, temp);
            i = i + 1;
        };
        all_questions
    }

    #[view]
    public fun get_ongoing_questions(): vector<addr::Messaging11::Question> acquires GmbuildersResource,GlobalState {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let ongoing_questions = global_state_ref.ongoing_questions;
        let  all_questions = vector::empty<addr::Messaging11::Question>();
        let  i = 0;
        while (i < vector::length(&ongoing_questions)) {
            let question_id = *vector::borrow(&ongoing_questions, i);
            let temp = *table::borrow(&resource.questions, question_id);
            vector::push_back(&mut all_questions, temp);
            i = i + 1;
        };
        all_questions
    }

    #[view]
    public fun get_completed_questions(): vector<addr::Messaging11::Question> acquires GmbuildersResource,GlobalState {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let global_state_ref = borrow_global<GlobalState>(@addr);
        let completed_questions = global_state_ref.completed_questions;
        let  all_questions = vector::empty<addr::Messaging11::Question>();
        let  i = 0;
        while (i < vector::length(&completed_questions)) {
            let question_id = *vector::borrow(&completed_questions, i);
            let temp = *table::borrow(&resource.questions, question_id);
            vector::push_back(&mut all_questions, temp);
            i = i + 1;
        };
        all_questions
    }

    #[view]
    public fun get_user_questions(user_address: address): vector<addr::Messaging11::User_Questions> acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let user = table::borrow(&resource.answered_questions, user_address);
        user.array
    }

    #[view]
    public fun get_specific_question(question_id: u64): addr::Messaging11::Question acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        *table::borrow(&resource.questions, question_id)
    }

    #[view]
    public fun get_user_token (user_address: address): u128 acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let user = table::borrow(&resource.users, user_address);
        let toke:u128= fixed_point64::get_raw_value(user.tokens);
        toke
    }

     #[view]
    public fun get_user_token_fixed_point (user_address: address): fixed_point64::FixedPoint64 acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let user = table::borrow(&resource.users, user_address);
        user.tokens
    }


    #[view]
    public fun get_user_questions1(user_address: address): vector<addr::Messaging11::User_Questions> acquires GmbuildersResource {
        let resource = borrow_global<GmbuildersResource>(@addr);
        let user = table::borrow(&resource.answered_questions, user_address);
        user.array
    }

 


}