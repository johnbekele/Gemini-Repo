const MOCK_BUGS = [
    {
      id: 'BUG-1024',
      title: 'Dashboard charts fail to load with large datasets',
      description:
        'When loading more than 10,000 data points, the performance charts crash and display a blank screen.',
      product: 'DAPA',
      type: 'Performance',
      severity: 'High',
      status: 'Resolved',
      createdAt: '2023-11-01T10:30:00Z',
      createdBy: 'Alex Johnson',
      resolution:
        'Implemented data pagination and lazy loading to handle large datasets more efficiently.',
      comments: [
        {
          id: 1,
          user: 'Maria Garcia',
          text: 'This was affecting our enterprise customers. Thanks for the quick fix!',
          timestamp: '2023-11-02T14:20:00Z',
          likes: 5,
        },
        {
          id: 2,
          user: 'Raj Patel',
          text: 'The pagination works great now. Could we also add a warning when datasets exceed the recommended size?',
          timestamp: '2023-11-03T09:15:00Z',
          likes: 3,
        },
      ],
      suggestedResolutions: [],
    },
    {
      id: 'BUG-1025',
      title: 'Error: DRIVER_IRQL_NOT_LESS_OR_EQUAL',
      description:
        'Users encounter a blue screen with the error code DRIVER_IRQL_NOT_LESS_OR_EQUAL after a recent Windows update.',
      product: 'Windows OS',
      type: 'System Crash',
      severity: 'Critical',
      status: 'Resolved',
      createdAt: '2023-11-05T10:00:00Z',
      createdBy: 'John Smith',
      resolution:
        'Updated the affected drivers and optimized the interrupt request levels to prevent conflicts.',
      comments: [
        {
          id: 3,
          user: 'Emily Chen',
          text: 'This was causing significant downtime. Happy to see it resolved.',
          timestamp: '2023-11-06T12:15:00Z',
          likes: 10,
        },
      ],
      suggestedResolutions: [],
    },
    {
      id: 'BUG-1026',
      title: 'Warning: Low Disk Space on System Drive',
      description:
        'Users receive frequent warnings about low disk space on the C: drive, affecting system performance.',
      product: 'Windows OS',
      type: 'System Maintenance',
      severity: 'Medium',
      status: 'Resolved',
      createdAt: '2023-11-07T11:30:00Z',
      createdBy: 'Alice Brown',
      resolution:
        'Implemented disk cleanup utilities and provided guidelines for managing storage space effectively.',
      comments: [
        {
          id: 4,
          user: 'Michael Nguyen',
          text: 'The cleanup tool was very helpful. The system runs much smoother now.',
          timestamp: '2023-11-08T14:00:00Z',
          likes: 8,
        },
      ],
      suggestedResolutions: [],
    },
    {
      id: 'BUG-1027',
      title: 'Error: UNEXPECTED_KERNEL_MODE_TRAP',
      description:
        'A random crash occurs with the error code UNEXPECTED_KERNEL_MODE_TRAP, particularly during intensive tasks.',
      product: 'Windows OS',
      type: 'System Crash',
      severity: 'High',
      status: 'Resolved',
      createdAt: '2023-11-09T09:45:00Z',
      createdBy: 'Michael Lee',
      resolution:
        'Investigated kernel operations and patched the code to handle exceptions properly.',
      comments: [
        {
          id: 5,
          user: 'Sophia Wang',
          text: 'Our team was facing this issue during data processing. Thanks for the fix!',
          timestamp: '2023-11-10T10:30:00Z',
          likes: 6,
        },
      ],
      suggestedResolutions: [],
    },
    {
      id: 'BUG-1028',
      title: 'Error: PAGE_FAULT_IN_NONPAGED_AREA',
      description:
        'The system frequently crashes with the error PAGE_FAULT_IN_NONPAGED_AREA, linked to faulty memory operations.',
      product: 'Windows OS',
      type: 'Memory Management',
      severity: 'Critical',
      status: 'Resolved',
      createdAt: '2023-11-10T14:20:00Z',
      createdBy: 'David Kim',
      resolution:
        'Conducted memory diagnostics and updated the memory management protocol to handle faults gracefully.',
      comments: [
        {
          id: 6,
          user: 'Olivia Martinez',
          text: 'This error was impacting our virtual machines. The resolution was much needed.',
          timestamp: '2023-11-11T16:00:00Z',
          likes: 12,
        },
      ],
      suggestedResolutions: [],
    },
  ];



  export default MOCK_BUGS;