// jest-dom doesn't implement extending types properly so importing this in an
// ambient context is how we get the merged interfaces for new functions like
// `.toHaveAttribute()` etc...
import '@testing-library/jest-dom/extend-expect'
