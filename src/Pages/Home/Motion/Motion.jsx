import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Motion = () => {
    const mutation = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/users', newTodo)
        },
      })
    
      return (
        <div className="my-40">
          {mutation.isPending ? (
            'Adding todo...'
          ) : (
            <>
              {mutation.isError ? (
                <div>An error occurred: {mutation.error.message}</div>
              ) : null}
    
              {mutation.isSuccess ? <div>Todo added!</div> : null}
    
              <button
                onClick={() => {
                  mutation.mutate({ id: new Date(), title: 'Do Laundry' })
                }}
              >
                Create Todo
              </button>
            </>
          )}
        </div>
      )
};

export default Motion;